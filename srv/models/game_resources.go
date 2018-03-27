package models

import (
	"bytes"
	"encoding/gob"
	"log"
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

func (g *Game) Encode(id string) ([]byte, error) {
	g.ID = id

	buf := new(bytes.Buffer)
	err := gob.NewEncoder(buf).Encode(g)

	return buf.Bytes(), err
}

type Games struct {
	Games []Game `json:"games"`
}

func (gs *Games) FilterDecode(data []byte, filters ...Filter) error {
	var game Game
	if err := gob.NewDecoder(bytes.NewBuffer(data)).Decode(&game); err != nil {
		return err
	}
	log.Println(game)

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
