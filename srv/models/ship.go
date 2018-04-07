package models

import (
	"bytes"
	"encoding/gob"

	"github.com/vitreuz/xtmg-ref/srv/models/constant"
)

// Ship is a base instance of a ship type.
type Ship struct {
	ID         int                    `json:"id"`
	Name       string                 `json:"name"`
	Faction    []constant.UnitFaction `json:"faction"`
	Attack     int                    `json:"attack"`
	Agility    int                    `json:"agility"`
	Hull       int                    `json:"hull"`
	Shields    int                    `json:"shields"`
	Actions    []constant.Action      `json:"actions"`
	Maneuvers  [][]int                `json:"maneuvers"`
	Size       constant.ShipSize      `json:"size"`
	FiringArcs []constant.FiringArc   `json:"firing_arcs"`

	XWS string `json:"xws"`
}

func (s *Ship) FilterDecode(data []byte, filters ...Filter) error {
	return gob.NewDecoder(bytes.NewBuffer(data)).Decode(s)
}

type Ships struct {
	Ships []Ship `json:"ships"`
}

func NewShips(ships ...Ship) *Ships {
	return &Ships{Ships: ships}
}

// XXX: refactor this!!!
func (s *Ships) FilterDecode(data []byte, filters ...Filter) error {
	var ship Ship
	if err := gob.NewDecoder(bytes.NewBuffer(data)).Decode(&ship); err != nil {
		return err
	}

	s.Ships, _ = ship.AppendByFilters(s.Ships, filters...)
	return nil
}
