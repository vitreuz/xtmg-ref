package v1

import (
	"net/http"
	"net/url"
	"strings"

	"github.com/sirupsen/logrus"

	"github.com/vitreuz/xtmg-ref/srv/models"
)

//go:generate counterfeiter . ShipDatabase
type ShipDatabase interface {
	ReadShips(...models.Filter) ([]models.Ship, error)
}

//go:generate counterfeiter . ShipActor
type ShipActor interface {
	ListShips([]models.Ship, ...string) ([]models.Ship, error)
}

type Ships struct {
	Ships []models.Ship `json:"ships"`
}

func (rh RouteHandlers) ListShips(w http.ResponseWriter, r *http.Request) {
	queries := r.URL.Query()

	ships, err := rh.db.ReadShips(filters(queries)...)
	if err != nil {
		logrus.WithError(err).Error("reading ReadShips")
		return
	}

	ships, err = rh.actor.ListShips(ships, queries["sort"]...)
	if err != nil {
		logrus.WithError(err).Error("from ListShips")
		return
	}

	WriteBody(w, Ships{ships})
}

func filters(q url.Values) []models.Filter {
	filters := []models.Filter{}
	for _, filter := range q["select"] {
		values := strings.Split(filter, ":")
		filters = append(filters, models.Filter{"select", values[0], values[1]})
	}
	for _, filter := range q["exclude"] {
		values := strings.Split(filter, ":")
		filters = append(filters, models.Filter{"exclude", values[0], values[1]})
	}

	return filters
}

func (rh RouteHandlers) FetchShip(w http.ResponseWriter, r *http.Request) {
}
