package router

import (
	"net/http"

	"github.com/vitreuz/xtmg-ref/srv/actor"
	"github.com/vitreuz/xtmg-ref/srv/database"
	"github.com/vitreuz/xtmg-ref/srv/router/routes_v1"

	"github.com/gorilla/mux"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}
type Routes []Route

var routes = Routes{}

func NewRouter() *mux.Router {
	router := mux.NewRouter()

	db := database.Open()
	actor := actor.NewActor()

	routes := initializeRoutes(db, actor)
	for _, route := range routes {
		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(route.HandlerFunc)
	}
	return router
}

func initializeRoutes(db v1.Database, actor v1.Actor) Routes {
	rh := v1.NewRouteHandler(db, actor)

	return Routes{
		{Name: "ListShips", Method: "GET", Pattern: "/v1/ships", HandlerFunc: rh.ListShips},
	}

}
