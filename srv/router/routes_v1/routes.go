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

type metadata struct {
	APIVersion string `json:"api_version"`
}

var Metadata = metadata{
	APIVersion: "v1",
}

type body struct {
	Metadata metadata    `json:"metadata"`
	Data     interface{} `json:"data"`
}

func WriteBody(w http.ResponseWriter, v interface{}) {
	w.Header().Set("Content-Type", "application/json")

	body := body{
		Metadata: Metadata,
		Data:     v,
	}

	if err := json.NewEncoder(w).Encode(body); err != nil {
		logrus.WithError(err).Error("json encoding")
	}
}
