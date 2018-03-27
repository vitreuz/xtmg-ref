package router

import (
	"net/http"

	"github.com/vitreuz/xtmg-ref/srv/compute"
	"github.com/vitreuz/xtmg-ref/srv/database"
	"github.com/vitreuz/xtmg-ref/srv/router/routes_v1"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}
type Routes []Route

var routes = Routes{}

func NewRouter(dbPath string) *mux.Router {
	router := mux.NewRouter()

	db, err := database.Open(dbPath)
	if err != nil {
		panic(err)
	}
	actor := compute.NewActor()

	routes := initializeRoutes(db, actor)
	for _, route := range routes {
		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(LogMiddleWare(route))
	}
	return router
}

func initializeRoutes(db v1.Database, actor v1.Actor) Routes {
	v1 := v1.NewRouteHandler(db, actor)

	return Routes{
		{Name: "ListShips", Method: "GET", Pattern: "/v1/{faction}/ships", HandlerFunc: v1.ListFactionShips},
		{Name: "FetchShip", Method: "GET", Pattern: "/v1/{faction}/ships/{ship_xws}", HandlerFunc: v1.FetchShip},
		{Name: "ListShipPilots", Method: "GET", Pattern: "/v1/{faction}/ships/{ship_xws}/pilots", HandlerFunc: v1.ListFactionShipPilots},
		{Name: "FetchShipPilot", Method: "GET", Pattern: "/v1/{faction}/ships/{ship_xws}/pilots/{pilot_xws}", HandlerFunc: v1.FetchFactionShipPilot},
		{Name: "ListUpgrades", Method: "GET", Pattern: "/v1/upgrades", HandlerFunc: v1.ListUpgrades},
		{Name: "FetchUpgrade", Method: "GET", Pattern: "/v1/upgrades/{upgrade_xws}", HandlerFunc: v1.FetchUpgrade},
		{Name: "CreateHotACGame", Method: "POST", Pattern: "/v1/games", HandlerFunc: v1.CreateGame},
		{Name: "ListHotACGames", Method: "GET", Pattern: "/v1/games", HandlerFunc: v1.ListGames},
		{Name: "FetchHotACGame", Method: "GET", Pattern: "/v1/games/{game_uuid}"},
		{Name: "CreateHotACPlayer", Method: "POST", Pattern: "/v1/games/{game_uuid}/players"},
		{Name: "ListHotACPlayer", Method: "GET", Pattern: "/v1/games/{game_uuid}/players"},
		{Name: "FetchHotACPlayer", Method: "GET", Pattern: "/v1/games/{game_uuid}/players/{player_uuid}"},
	}

}

func LogMiddleWare(route Route) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.WithFields(log.Fields{
			"method":  route.Method,
			"pattern": r.URL.Path,
			"params":  r.URL.Query(),
		}).Info("REQ: ", route.Name)

		route.HandlerFunc(w, r)

		log.WithFields(log.Fields{}).Info("RES: ", route.Name)
	}
}
