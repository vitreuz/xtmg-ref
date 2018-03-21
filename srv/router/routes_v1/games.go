package v1

import (
	"net/http"
	"net/url"

	"github.com/sirupsen/logrus"
	"github.com/vitreuz/xtmg-ref/srv/models"

	log "github.com/sirupsen/logrus"
)

type GamesDatabase interface {
	ReadGames(url.Values) (models.Games, error)
}

func (rh RouteHandlers) ListGames(w http.ResponseWriter, r *http.Request) {
	queries := r.URL.Query()

	log.WithField("url_values", queries).Info("received list games")
	games, err := rh.db.ReadGames(queries)
	if err != nil {
		logrus.WithError(err).Error("reading games")
		http.Error(w, "error reading game", http.StatusInternalServerError)
		return
	}

	WriteBody(w, games)
}
