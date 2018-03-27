package compute

import (
	"encoding/json"
	"io"

	"github.com/vitreuz/xtmg-ref/srv/models"
)

type GameRequest struct {
	Name string `json:"name"`
}

func (Actor) UnmarshalGame(r io.Reader) (*models.Game, error) {
	var req GameRequest

	if err := json.NewDecoder(r).Decode(&req); err != nil {
		return nil, err
	}

	return models.NewGame(req.Name), nil
}
