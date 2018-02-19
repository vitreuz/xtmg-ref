package v1

import (
	"encoding/json"
	"net/http"

	"github.com/sirupsen/logrus"
)

type Database interface {
	ShipDatabase
}

type Actor interface {
	ShipActor
}

type RouteHandlers struct {
	db    Database
	actor Actor
}

func NewRouteHandler(database Database, actor Actor) *RouteHandlers {
	return &RouteHandlers{db: database, actor: actor}
}

func WriteBody(w http.ResponseWriter, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(v); err != nil {
		logrus.WithError(err).Error("json encoding")
	}
}
