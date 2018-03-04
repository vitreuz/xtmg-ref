package v1

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sirupsen/logrus"

	"github.com/vitreuz/xtmg-ref/srv/models"
)

type UpgradeDatabase interface {
	ReadUpgrades(...models.Filter) ([]models.Upgrade, error)
	ReadUpgradeByXWS(string) (models.Upgrade, error)
}

type Upgrades struct {
	Upgrades []models.Upgrade `json:"upgrades"`
}

func (rh RouteHandlers) ListUpgrades(w http.ResponseWriter, r *http.Request) {
	queries := r.URL.Query()

	upgrades, err := rh.db.ReadUpgrades(filters(queries)...)
	if err != nil {
		logrus.WithError(err).Error("reading upgrades")
		return
	}

	WriteBody(w, Upgrades{upgrades})
}

func (rh RouteHandlers) FetchUpgrade(w http.ResponseWriter, r *http.Request) {
	upgradeXWS := mux.Vars(r)["upgrade_xws"]

	upgrade, err := rh.db.ReadUpgradeByXWS(upgradeXWS)
	if err != nil {
		logrus.WithError(err).Error("reading upgrade")
		return
	}

	WriteBody(w, upgrade)
}
