package v1

import (
	"io"
	"net/http"
	"net/url"

	"github.com/gorilla/mux"

	"github.com/sirupsen/logrus"
	"github.com/vitreuz/xtmg-ref/srv/models"
)

type GamesDatabase interface {
	CreateGame(*models.Game) error
	ReadGame(id string) (*models.Game, error)
	ReadGames(url.Values) (*models.Games, error)
	UpdateGame(*models.Game) error
}

type GamesActor interface {
	AggregateGame(*models.Game, io.Reader) error
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

func (rh RouteHandlers) UpdateGame(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["game_uuid"]
	game, err := rh.db.ReadGame(id)
	if err != nil {
		logrus.WithError(err).Error("read game")
		http.Error(w, "read game", http.StatusInternalServerError)
		return
	}

	if err := rh.actor.AggregateGame(game, r.Body); err != nil {
		logrus.WithError(err).Error("update game")
		http.Error(w, "update game", http.StatusInternalServerError)
		return
	}

	if err := rh.db.UpdateGame(game); err != nil {
		logrus.WithError(err).Error("update game")
		http.Error(w, "update game", http.StatusInternalServerError)
		return
	}

	WriteBody(w, game)
}
