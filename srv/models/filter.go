package models

import (
	"strings"

	"github.com/vitreuz/xtmg-ref/srv/models/constant"
)

func (s Ship) SelectByID(id int) bool { return s.ID == id }

func (s Ship) SelectByName(name string) bool { return strings.Contains(s.Name, name) }

func (s Ship) SelectByFaction(faction constant.UnitFaction) bool {
	for _, shipFaction := range s.Faction {
		if shipFaction == faction {
			return true
		}
	}
	return false
}

func (s Ship) SelectByXWS(xws string) bool { return strings.Contains(s.XWS, xws) }

func (s Ship) SelectByAction(action constant.Action) bool {
	for _, shipAction := range s.Actions {
		if shipAction == action {
			return true
		}
	}
	return false
}

func (s Ship) SelectByFiringArc(firingArc constant.FiringArc) bool {
	for _, shipFiringArc := range s.FiringArcs {
		if shipFiringArc == firingArc {
			return true
		}
	}
	return false
}

func (s Ship) SelectByStat(stat constant.Stat, value int) bool {
	switch stat {
	case constant.AgilityStat:
		return s.Agiliy >= value
	case constant.AttackStat:
		return s.Attack >= value
	case constant.HullStat:
		return s.Hull >= value
	case constant.ShieldsStat:
		return s.Shields >= value
	}
	return false
}

func (s Ship) SelectBySize(size constant.ShipSize) bool { return s.Size == size }
