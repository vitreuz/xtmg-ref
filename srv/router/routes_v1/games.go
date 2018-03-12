package v1

import (
	"net/http"

	"github.com/sirupsen/logrus"

	"github.com/vitreuz/xtmg-ref/srv/models"
)

type GameDatabase interface {
	ReadGames(...models.Filter) ([]models.Game, error)
}

type Games struct {
	Games []models.Game `json:"games"`
}

func (rh RouteHandlers) ListGames(w http.ResponseWriter, r *http.Request) {
	queries := r.URL.Query()

	games, err := rh.db.ReadGames(filters(queries)...)
	if err != nil {
		logrus.WithError(err).Error("reading games")
	}

	WriteBody(w, Games{games})
}
