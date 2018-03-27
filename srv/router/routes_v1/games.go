package v1

import (
	"io"
	"net/http"
	"net/url"

	"github.com/sirupsen/logrus"
	"github.com/vitreuz/xtmg-ref/srv/models"
)

type GamesDatabase interface {
	ReadGames(url.Values) (*models.Games, error)
	CreateGame(*models.Game) error
}

type GamesActor interface {
	UnmarshalGame(io.Reader) (*models.Game, error)
}

func (rh RouteHandlers) ListGames(w http.ResponseWriter, r *http.Request) {
	queries := r.URL.Query()

	games, err := rh.db.ReadGames(queries)
	if err != nil {
		logrus.WithError(err).Error("reading games")
		http.Error(w, "error reading game", http.StatusInternalServerError)
		return
	}

	WriteBody(w, games)
}

func (rh RouteHandlers) CreateGame(w http.ResponseWriter, r *http.Request) {
	game, err := rh.actor.UnmarshalGame(r.Body)
	if err != nil {
		logrus.WithError(err).Error("unmarshal game")
		http.Error(w, "error unmarshal game", http.StatusInternalServerError)
		return
	}

	if err = rh.db.CreateGame(game); err != nil {
		logrus.WithError(err).Error("create game")
		http.Error(w, "create game", http.StatusInternalServerError)
		return
	}

	WriteBody(w, game)
}
