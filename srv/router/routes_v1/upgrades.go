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

type UpgradeActor interface {
}

type Upgrades struct {
	Upgrades []models.Upgrade `json:"upgrades"`
}

func ListUpgrades(actor UpgradeActor, database UpgradeDatabase) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		queries := r.URL.Query()

		upgrades, err := database.ReadUpgrades(filters(queries)...)
		if err != nil {
			logrus.WithError(err).Error("reading upgrades")
			return
		}

		WriteBody(w, Upgrades{upgrades})
	}
}

func FetchUpgrade(actor UpgradeActor, database UpgradeDatabase) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		upgradeXWS := mux.Vars(r)["upgrade_xws"]

		upgrade, err := database.ReadUpgradeByXWS(upgradeXWS)
		if err != nil {
			logrus.WithError(err).Error("reading upgrade")
			return
		}

		WriteBody(w, upgrade)
	}
}
