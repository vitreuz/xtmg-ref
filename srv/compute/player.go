package compute

import (
	"encoding/json"
	"fmt"
	"io"
	"strings"

	"github.com/vitreuz/xtmg-ref/srv/models"
)

type postPlayer struct {
	Name     string `json:"name"`
	Callsign string `json:"callsign"`
	ShipXWS  string `json:"ship_xws"`
}

func (req postPlayer) validate() error {
	var errs ValidationErrors

	if req.Name == "" {
		errs = append(errs, RequiredFieldError("name"))
	}
	if req.Callsign == "" {
		errs = append(errs, RequiredFieldError("callsign"))
	}
	if req.ShipXWS == "" {
		errs = append(errs, RequiredFieldError("ship_xws"))
	}

	if len(errs) == 0 {
		return nil
	}
	return errs
}

type ValidationErrors []error

func (e ValidationErrors) Error() string {
	if len(e) == 1 {
		return e[0].Error()
	}

	buf := new(strings.Builder)
	buf.WriteString("multiple errors encountered: ")
	for _, err := range e {
		fmt.Fprint(buf, " ")
		fmt.Fprint(buf, err)
		fmt.Fprint(buf, " ")
	}

	return buf.String()
}

type RequiredFieldError string

func (e RequiredFieldError) Error() string {
	return "missing required field: " + string(e)
}

func (Actor) CreatePlayerRequest(r io.Reader, gameID string) (*models.Player, error) {
	var req postPlayer

	if err := json.NewDecoder(r).Decode(&req); err != nil {
		return nil, err
	}

	return models.NewPlayer(req.Name, req.Callsign, req.ShipXWS, gameID), req.validate()
}
