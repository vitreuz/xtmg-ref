package models

import "github.com/vitreuz/xtmg-ref/srv/models/constant"

// Pilot is an instance of a Ship's pilot.
type Pilot struct {
	ID      int                    `json:"id"`
	Name    string                 `json:"name"`
	Unique  bool                   `json:"unique,omitempty"`
	Ship    string                 `json:"ship"`
	Skill   int                    `json:"skill"`
	Points  int                    `json:"points"`
	Slots   []constant.UpgradeType `json:"slots"`
	Text    string                 `json:"text"`
	Faction constant.UnitFaction   `json:"faction"`

	ShipOverride *pilotOverride `json:"ship_override,omitempty"`
	Grants       []pilotGrant   `json:"grants,omitempty"`

	XWS string `json:"xws"`
}

type pilotOverride struct {
	Attack  int `json:"attack,omitempty"`
	Agiliy  int `json:"agiliy,omitempty"`
	Hull    int `json:"hull,omitempty"`
	Shields int `json:"shields,omitempty"`
}

type pilotGrant struct {
	Type string               `json:"type"`
	Name string               `json:"name"`
	Slot constant.UpgradeType `json:"slot"`
}

// Upgrade is an instance of an upgrade. It includes possibly unused values that
// are only populated in the cases where upgrades are combat specific, grant
// effects and/or slots, or have usage/equip restrictions.
type Upgrade struct {
	ID      int                  `json:"id"`
	Name    string               `json:"name"`
	Unique  bool                 `json:"unique,omitempty"`
	Limited bool                 `json:"limited,omitempty"`
	Slot    constant.UpgradeType `json:"slot"`
	Points  int                  `json:"points"`
	Text    string               `json:"text"`

	// The following stats are only used for relevant combat upgrades. (cannons,
	// missiles, torpedos, turrets, etc.)
	Attack int    `json:"attack,omitempty"`
	Range  string `json:"range,omitempty"`
	Effect string `json:"effect,omitempty"`

	// Grants are used to apply additionaly stats and/or effects on a ship.
	Grants []upgradeGrant `json:"grants,omitempty"`

	// The following stats reflect restriction requirments needed to either use
	// the card or equip it.
	Energy  int                  `json:"energy,omitempty"`
	Faction constant.UnitFaction `json:"faction,omitempty"`
	Ship    []string             `json:"ship,omitempty"`
	Size    []constant.ShipSize  `json:"size,omitempty"`

	XWS string `json:"xws"`
}

type upgradeGrant struct {
	Type  string `json:"type"`
	Name  string `json:"name"`
	Value int    `json:"value,omitempty,"`
}

// Squadron is an instance of a group of units typically used to create lists.
type Squadron struct {
	ID          int                      `json:"id,omitempty"`
	Version     string                   `json:"version"`
	Name        string                   `json:"name,omitempty"`
	Points      int                      `json:"points,omitempty"`
	Faction     constant.SquadronFaction `json:"faction"`
	Description string                   `json:"description,omitempty"`
	Obstacles   []string                 `json:"obstacles,omitempty"`
	Pilots      []Unit                   `json:"pilots"`
}

// Unit is single game unit. It is represented by a valid combination of a
// pilot, a ship, and upgrades.
type Unit struct {
	Name     string   `json:"name"`
	Ship     string   `json:"ship"`
	Upgrades []string `json:"upgrades,omitempty"`
}

type Warning struct {
	Error error `json:"error,omitempty"`
}
