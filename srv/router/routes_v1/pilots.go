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

type PilotActor interface {
}

type Pilots struct {
	Pilots []models.Pilot `json:"pilots"`
}

func ListShipPilots(actor PilotActor, database PilotDatabase) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		xws := mux.Vars(r)["ship_xws"]
		queries := r.URL.Query()

		pilots, err := database.ReadPilotsByShipXWS(xws, filters(queries)...)
		if err != nil {
			logrus.WithError(err).Error("reading ReadPilotsByShipXWS")
			return
		}

		WriteBody(w, Pilots{pilots})
	}
}

func ListFactionShipPilots(actor PilotActor, database PilotDatabase) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		faction := mux.Vars(r)["faction"]
		xws := mux.Vars(r)["ship_xws"]
		queries := r.URL.Query()

		pilots, err := database.ReadPilotsByShipXWS(xws, append(filters(queries), models.SelectFilter("faction", faction))...)
		if err != nil {
			logrus.WithError(err).Error("reading ReadPilotsByShipXWS")
			return
		}

		WriteBody(w, Pilots{pilots})
	}
}

func FetchFactionShipPilot(actor PilotActor, database PilotDatabase) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		vars := mux.Vars(r)
		faction, shipXWS, pilotXWS := vars["faction"], vars["ship_xws"], vars["pilot_xws"]

		pilot, err := database.ReadPilotByShipFactionXWS(shipXWS, faction, pilotXWS)
		if err != nil {
			logrus.WithError(err).Error("reading ReadPBSFX")
			return
		}

		WriteBody(w, pilot)
	}
}
