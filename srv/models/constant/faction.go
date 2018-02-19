package constant

type SquadronFaction string

const (
	FactionRebel    SquadronFaction = "rebel"
	FactionImperial SquadronFaction = "imperial"
	FactionScum     SquadronFaction = "scum"
)

type PilotFaction string

const (
	FactionRebelAllicance PilotFaction = "Rebel Alliance"
	FactionResistance     PilotFaction = "Resistance"
	FactionGalacticEmpire PilotFaction = "Galactic Empire"
	FactionFirstOrder     PilotFaction = "First Order"
	FactionScumAndVillany PilotFaction = "Scum and Villainy"
)

func (pf PilotFaction) ToSquadronFaction() SquadronFaction {
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
