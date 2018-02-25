package constant

import "strings"

type SquadronFaction string

const (
	FactionRebel    SquadronFaction = "rebel"
	FactionImperial SquadronFaction = "imperial"
	FactionScum     SquadronFaction = "scum"
)

type UnitFaction string

const (
	FactionRebelAllicance UnitFaction = "Rebel Alliance"
	FactionResistance     UnitFaction = "Resistance"
	FactionGalacticEmpire UnitFaction = "Galactic Empire"
	FactionFirstOrder     UnitFaction = "First Order"
	FactionScumAndVillany UnitFaction = "Scum and Villainy"
)

func (pf UnitFaction) ToSquadronFaction() SquadronFaction {
	switch pf {
	case FactionRebelAllicance, FactionResistance:
		return FactionRebel
	case FactionGalacticEmpire, FactionFirstOrder:
		return FactionImperial
	case FactionScumAndVillany:
		return FactionScum
	}

	panic("invalid faction type")
}

func (f UnitFaction) Simplify() string {
	simple := strings.ToLower(string(f))
	return strings.Replace(simple, " ", "_", -1)
}
