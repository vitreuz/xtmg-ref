package v1

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/sirupsen/logrus"
)

//go:generate table-mocks $GOFILE -s Database

type Database interface {
	GamesDatabase
	ShipDatabase
	PilotDatabase
	UpgradeDatabase
}

type Actor interface {
	ShipActor
	GamesActor
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
	APIVersion: "v1-unstable",
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
		http.Error(w, fmt.Sprintf("json encoding %T: %v", v, err), http.StatusInternalServerError)
	}
}
