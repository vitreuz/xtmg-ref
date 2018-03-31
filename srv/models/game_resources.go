package models

import (
	"bytes"
	"encoding/gob"
)

type Game struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	IsActive bool   `json:"is_active"`
}

func NewGame(name string) *Game {
	return &Game{
		Name:     name,
		IsActive: false,
	}
}

func (g *Game) FilterDecode(data []byte, filters ...Filter) error {
	return gob.NewDecoder(bytes.NewBuffer(data)).Decode(g)
}

func (g *Game) Encode() ([]byte, error) {
	buf := new(bytes.Buffer)
	err := gob.NewEncoder(buf).Encode(g)

	return buf.Bytes(), err
}

func (g Game) IDBytes() []byte {
	return []byte(g.ID)
}

type Games struct {
	Games []Game `json:"games"`
}

func (gs *Games) FilterDecode(data []byte, filters ...Filter) error {
	var game Game
	if err := gob.NewDecoder(bytes.NewBuffer(data)).Decode(&game); err != nil {
		return err
	}

	gs.appendByFilter(game, filters...)
	return nil
}

func (gs *Games) appendByFilter(game Game, filters ...Filter) {
	for _, filter := range filters {
		if !game.selectBy(filter) {
			return
		}
	}

	gs.Games = append(gs.Games, game)
}

func (g Game) selectBy(filter Filter) bool {
	switch filter.field {
	case "active":
		return g.IsActive
	}

	return false
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
