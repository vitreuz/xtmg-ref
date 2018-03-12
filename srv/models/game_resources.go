package models

type Game struct {
	ID string `json:"id"`
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
