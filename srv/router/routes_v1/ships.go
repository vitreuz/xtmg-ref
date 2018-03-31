package v1

import (
	"net/http"
	"net/url"
	"strings"

	"github.com/vitreuz/xtmg-ref/srv/models"

	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

//go:generate counterfeiter . ShipDatabase
type ShipDatabase interface {
	ReadShips(filters ...models.Filter) (ships []models.Ship, err error)
	ReadShipsByFaction(string, ...models.Filter) ([]models.Ship, error)
	ReadShipByXWS(string) (models.Ship, error)
}

//go:generate counterfeiter . ShipActor
type ShipActor interface {
	ListShips([]models.Ship, ...string) ([]models.Ship, error)
}

type Ships struct {
	Ships []models.Ship `json:"ships"`
}

func ListShips(actor ShipActor, database ShipDatabase) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		queries := r.URL.Query()

		ships, err := database.ReadShips(filters(queries)...)
		if err != nil {
			logrus.WithError(err).Error("reading ReadShips")
			return
		}

		ships, err = actor.ListShips(ships, queries["sort"]...)
		if err != nil {
			logrus.WithError(err).Error("from ListShips")
			return
		}

		WriteBody(w, Ships{ships})
	}
}

func ListFactionShips(actor ShipActor, database ShipDatabase) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		faction := mux.Vars(r)["faction"]
		queries := r.URL.Query()

		ships, err := database.ReadShipsByFaction(faction, filters(queries)...)
		if err != nil {
			logrus.WithError(err).Error("reading ReadShips")
			return
		}

		ships, err = actor.ListShips(ships, queries["sort"]...)
		if err != nil {
			logrus.WithError(err).Error("from ListShips")
			return
		}

		WriteBody(w, Ships{ships})
	}
}

func FetchShip(actor ShipActor, database ShipDatabase) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		xws := mux.Vars(r)["ship_xws"]

		ship, err := database.ReadShipByXWS(xws)
		if err != nil {
			logrus.WithError(err).Error("reading ReadShipsByXWS")
			return
		}

		WriteBody(w, ship)
	}
}

func filters(q url.Values) []models.Filter {
	filters := []models.Filter{}
	for _, filter := range q["select"] {
		values := strings.Split(filter, ":")
		filters = append(filters, models.SelectFilter(values[0], values[1]))
	}
	for _, filter := range q["exclude"] {
		values := strings.Split(filter, ":")
		filters = append(filters, models.ExcludeFilter(values[0], values[1]))
	}

	return filters
}
