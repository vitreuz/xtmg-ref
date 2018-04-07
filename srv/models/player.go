package models

import (
	"bytes"
	"encoding/gob"
)

type Player struct {
	ID         string `json:"id"`
	Name       string `json:"name"`
	Callsign   string `json:"callsign"`
	PilotSkill int    `json:"pilot_skill"`

	StarterXP int `json:"starter_xp"`
	CurrentXP int `json:"current_xp"`
	totalXP   int
	spentXP   int

	Ships    []Ship    `json:"ships"`
	Upgrades []Upgrade `json:"upgrades"`

	GameID string `json:"game_id"`
}

func NewPlayer(name, callsign, shipXWS, gameID string) *Player {
	ship := Ship{XWS: shipXWS}

	return &Player{
		Name:     name,
		Callsign: callsign,
		Ships:    []Ship{ship},
		GameID:   gameID,
	}
}

func (p Player) IDBytes() []byte {
	return []byte(p.ID)
}

func (p Player) Encode() ([]byte, error) {
	buf := new(bytes.Buffer)
	err := gob.NewEncoder(buf).Encode(p)

	return buf.Bytes(), err
}

func (p *Player) CalculateStartXP(baseXP int) {
	switch p.Ships[0].XWS {
	case "xwing":
		p.StarterXP = baseXP - 3
		p.CurrentXP = baseXP - 3
	case "ywing":
		p.StarterXP = baseXP
		p.CurrentXP = baseXP
	}
}
