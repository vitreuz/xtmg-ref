package v1

import (
	"io"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/vitreuz/xtmg-ref/srv/models"
)

// To create a player we must Unmarshal the request body and then add it the the
// database using the provided game id
type PlayerActor interface {
	CreatePlayerRequest(io.Reader, string) (*models.Player, error)
}

type PlayerDatabase interface {
	CreatePlayer(*models.Player) (*models.Player, error)
}

// CreatePlayer unmarshals the Player object from the request body and supplies
// it to the database to be written.
func CreatePlayer(decoder PlayerActor, database PlayerDatabase) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		gameID := mux.Vars(r)["game_uuid"]

		player, err := decoder.CreatePlayerRequest(r.Body, gameID)
		if fatal := handleError(w, err); fatal {
			return
		}

		player, err = database.CreatePlayer(player)
		if fatal := handleError(w, err); fatal {
			return
		}

		WriteBody(w, player)
	}
}
