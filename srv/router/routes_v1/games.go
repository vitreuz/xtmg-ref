package v1

import (
	"io"
	"net/http"
	"net/url"

	"github.com/gorilla/mux"

	"github.com/sirupsen/logrus"
	"github.com/vitreuz/xtmg-ref/srv/models"
)

type GameDatabase interface {
	CreateGame(*models.Game) error
	ReadGame(id string) (*models.Game, error)
	ReadGames(url.Values) (*models.Games, error)
	UpdateGame(*models.Game) error
}

type GameActor interface {
	AggregateGame(*models.Game, io.Reader) error
	UnmarshalGame(io.Reader) (*models.Game, error)
}

func ListGames(actor GameActor, database GameDatabase) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		queries := r.URL.Query()

		games, err := database.ReadGames(queries)
		if err != nil {
			logrus.WithError(err).Error("reading games")
			http.Error(w, "error reading game", http.StatusInternalServerError)
			return
		}

		WriteBody(w, games)
	}
}

func CreateGame(actor GameActor, database GameDatabase) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		game, err := actor.UnmarshalGame(r.Body)
		if err != nil {
			logrus.WithError(err).Error("unmarshal game")
			http.Error(w, "error unmarshal game", http.StatusInternalServerError)
			return
		}

		if err = database.CreateGame(game); err != nil {
			logrus.WithError(err).Error("create game")
			http.Error(w, "create game", http.StatusInternalServerError)
			return
		}

		WriteBody(w, game)
	}
}

func UpdateGame(actor GameActor, database GameDatabase) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		id := mux.Vars(r)["game_uuid"]
		game, err := database.ReadGame(id)
		if err != nil {
			logrus.WithError(err).Error("read game")
			http.Error(w, "read game", http.StatusInternalServerError)
			return
		}

		if err := actor.AggregateGame(game, r.Body); err != nil {
			logrus.WithError(err).Error("update game")
			http.Error(w, "update game", http.StatusInternalServerError)
			return
		}

		if err := database.UpdateGame(game); err != nil {
			logrus.WithError(err).Error("update game")
			http.Error(w, "update game", http.StatusInternalServerError)
			return
		}

		WriteBody(w, game)
	}
}
