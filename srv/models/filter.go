package models

import (
	"fmt"
	"strconv"
	"strings"
)

type Filter [3]string

func (f Filter) isSelect() bool {
	return f[0] == "select"
}

type UnknownFilter string

func (e UnknownFilter) Error() string {
	return fmt.Sprintf("unexpected filter value: %s", string(e))
}

func (s Ship) AppendByFilters(ships []Ship, filters ...Filter) ([]Ship, []Warning) {
	if len(filters) == 0 {
		return append(ships, s), nil
	}

	warnings := []Warning{}
	for _, filter := range filters {
		selected, err := s.selectBy(filter)
		if err != nil {
			warnings = append(warnings, Warning{Error: err})
			continue
		}

		if filter.isSelect() && !selected {
			return ships, warnings
		}
		if !filter.isSelect() && selected {
			return ships, warnings
		}
	}

	return append(ships, s), warnings
}

func (s Ship) selectBy(filter Filter) (bool, error) {
	switch filterBy := filter[1]; filterBy {
	case "name":
		return s.selectByNameOrXWS(filter[2]), nil
	case "faction":
		return s.selectByFaction(filter[2]), nil
	case "attack", "agility", "hull", "shields":
		return s.selectByStat(filterBy, filter[2])
	case "action":
		return s.selectByAction(filter[2]), nil
	case "maneuvers":
		return s.selectByManuevers(filter[2])
	case "size":
		return string(s.Size) == filter[2], nil
	case "firing_arcs":
		return s.selectByFiringArc(filter[2]), nil
	case "xws":
		return strings.Contains(s.XWS, filter[2]), nil
	}

	return filter.isSelect(), UnknownFilter(filter[1])
}

func (s Ship) selectByNameOrXWS(name string) bool {
	return strings.Contains(s.Name, name) || strings.Contains(s.XWS, name)
}

func (s Ship) selectByFaction(faction string) bool {
	for _, shipFaction := range s.Faction {
		if strings.Contains(shipFaction.Simplify(), faction) {
			return true
		}
		if strings.Contains(string(shipFaction.ToSquadronFaction()), faction) {
			return true
		}
	}

	return false
}

func (s Ship) selectByStat(stat, value string) (bool, error) {
	intVal, err := strconv.Atoi(value)
	if err != nil {
		return false, err
	}

	switch stat {
	case "attack":
		return s.Attack >= intVal, nil
	case "agility":
		return s.Agility >= intVal, nil
	case "hull":
		return s.Hull >= intVal, nil
	case "shields":
		return s.Shields >= intVal, nil
	}

	return false, nil
}

func (s Ship) selectByAction(action string) bool {
	for _, shipAction := range s.Actions {
		if shipAction.Simplify() == action {
			return true
		}
	}
	return false
}

func (s Ship) selectByManuevers(value string) (bool, error) {
	intVal, err := strconv.Atoi(value)
	if err != nil {
		return false, err
	}

	return s.ManeuversSummary()[0][0] >= intVal, nil
}

func (s Ship) selectByFiringArc(arc string) bool {
	for _, shipArc := range s.FiringArcs {
		if shipArc.Simplify() == arc {
			return true
		}
	}
	return false
}
