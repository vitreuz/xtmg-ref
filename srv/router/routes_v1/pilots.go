package v1

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"

	"github.com/vitreuz/xtmg-ref/srv/models"
)

type PilotDatabase interface {
	ReadPilotsByShipXWS(string, ...models.Filter) ([]models.Pilot, error)
	ReadPilotByShipFactionXWS(string, string, string) (models.Pilot, error)
}

type Pilots struct {
	Pilots []models.Pilot `json:"pilots"`
}

func (rh RouteHandlers) ListShipPilots(w http.ResponseWriter, r *http.Request) {
	xws := mux.Vars(r)["ship_xws"]
	queries := r.URL.Query()

	pilots, err := rh.db.ReadPilotsByShipXWS(xws, filters(queries)...)
	if err != nil {
		logrus.WithError(err).Error("reading ReadPilotsByShipXWS")
		return
	}

	WriteBody(w, Pilots{pilots})
}

func (rh RouteHandlers) ListFactionShipPilots(w http.ResponseWriter, r *http.Request) {
	faction := mux.Vars(r)["faction"]
	xws := mux.Vars(r)["ship_xws"]
	queries := r.URL.Query()

	pilots, err := rh.db.ReadPilotsByShipXWS(xws, append(filters(queries), models.SelectFilter("faction", faction))...)
	if err != nil {
		logrus.WithError(err).Error("reading ReadPilotsByShipXWS")
		return
	}

	WriteBody(w, Pilots{pilots})
}

func (rh RouteHandlers) FetchFactionShipPilot(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	faction, shipXWS, pilotXWS := vars["faction"], vars["ship_xws"], vars["pilot_xws"]

	pilot, err := rh.db.ReadPilotByShipFactionXWS(shipXWS, faction, pilotXWS)
	if err != nil {
		logrus.WithError(err).Error("reading ReadPBSFX")
		return
	}

	WriteBody(w, pilot)
}
