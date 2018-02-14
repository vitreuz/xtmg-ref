package models

import "github.com/vitreuz/xtmg-ref/srv/models/constants"

// Ship is a base instance of a ship type.
type Ship struct {
	ID         int                   `json:"id"`
	Name       string                `json:"name"`
	Faction    []constants.Faction   `json:"faction"`
	Attack     int                   `json:"attack"`
	Agiliy     int                   `json:"agiliy"`
	Hull       int                   `json:"hull"`
	Shields    int                   `json:"shields"`
	Actions    []constants.Action    `json:"actions"`
	Maneuvers  [][]int               `json:"maneuvers"`
	Size       constants.ShipSize    `json:"size"`
	FiringArcs []constants.FiringArc `json:"firing_arcs"`

	XWS string `json:"xws"`
}

// Pilot is an instance of a Ship's pilot.
type Pilot struct {
	ID      int                     `json:"id"`
	Name    string                  `json:"name"`
	Unique  bool                    `json:"unique,omitempty"`
	Ship    string                  `json:"ship"`
	Skill   int                     `json:"skill"`
	Points  int                     `json:"points"`
	Slots   []constants.UpgradeType `json:"slots"`
	Text    string                  `json:"text"`
	Faction constants.Faction       `json:"faction"`

	XWS string `json:"xws"`
}

// Upgrade is an instance of an upgrade. It includes possibly unused values that
// are only populated in the cases where upgrades are combat specific, grant
// effects and/or slots, or have usage/equip restrictions.
type Upgrade struct {
	ID      int                   `json:"id"`
	Name    string                `json:"name"`
	Unique  bool                  `json:"unique,omitempty"`
	Limited bool                  `json:"limited,omitempty"`
	Slot    constants.UpgradeType `json:"slot"`
	Points  int                   `json:"points"`
	Text    string                `json:"text"`

	// The following stats are only used for relevant combat upgrades. (cannons,
	// missiles, torpedos, turrets, etc.)
	Attack int    `json:"attack,omitempty"`
	Range  string `json:"range,omitempty"`
	Effect string `json:"effect,omitempty"`

	// Grants are used to apply additionaly stats and/or effects on a ship.
	Grants []grant `json:"grants,omitempty"`

	// The following stats reflect restriction requirments needed to either use
	// the card or equip it.
	Energy int                  `json:"energy,omitempty"`
	Ship   []string             `json:"ship,omitempty"`
	Size   []constants.ShipSize `json:"size,omitempty"`

	XWS string `json:"xws"`
}

type grant struct {
	Type  string `json:"type"`
	Name  string `json:"name"`
	Value int    `json:"value,omitempty,"`
}

// Squadron is an instance of a group of units typically used to create lists.
type Squadron struct {
	ID          int               `json:"id,omitempty"`
	Version     string            `json:"version"`
	Name        string            `json:"name,omitempty"`
	Points      int               `json:"points,omitempty"`
	Faction     constants.Faction `json:"faction"`
	Description string            `json:"description,omitempty"`
	Obstacles   []string          `json:"obstacles,omitempty"`
	Pilots      []Unit            `json:"pilots"`
}

// Unit is single game unit. It is represented by a valid combination of a
// pilot, a ship, and upgrades.
type Unit struct {
	Name     string   `json:"name"`
	Ship     string   `json:"ship"`
	Upgrades []string `json:"upgrades,omitempty"`
}
