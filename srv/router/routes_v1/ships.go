package v1

import (
	"net/http"

	"github.com/sirupsen/logrus"

	"github.com/vitreuz/xtmg-ref/srv/models"
)

//go:generate counterfeiter . ShipDatabase
type ShipDatabase interface {
	ReadShips() ([]models.Ship, error)
}

//go:generate counterfeiter . ShipActor
type ShipActor interface {
	ListShips([]models.Ship) ([]models.Ship, error)
}

type Ships struct {
	Ships []models.Ship `json:"ships"`
}

func (rh RouteHandlers) ListShips(w http.ResponseWriter, r *http.Request) {
	ships, err := rh.db.ReadShips()
	if err != nil {
		logrus.WithError(err).Error("reading ReadShips")
		return
	}

	ships, err = rh.actor.ListShips(ships)
	if err != nil {
		logrus.WithError(err).Error("from ListShips")
		return
	}

	WriteBody(w, Ships{ships})
}
