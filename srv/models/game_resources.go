package models

import (
	"bytes"
	"encoding/gob"
)

type Game struct {
	ID string `json:"id"`
}

type Games struct {
	Games []Game `json:"games"`
}

func (gs Games) FilterDecode(data []byte, filters ...Filter) error {
	var game Game
	if err := gob.NewDecoder(bytes.NewBuffer(data)).Decode(&game); err != nil {
		return err
	}

	gs.Games = append(gs.Games, game)
	return nil
}

type Player struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Callsign string `json:"name"`

	StarterXP int `json:"starter_xp"`
	CurrentXP int `json:"current_xp`
	totalXP   int `json:"-"`
	spentXP   int `json:"-"`
}
