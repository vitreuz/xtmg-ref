package models

import (
	"fmt"
	"net/url"
	"strconv"
	"strings"

	"github.com/vitreuz/xtmg-ref/srv/models/constant"
)

type Filter struct {
	method constant.FilterMethod
	field  string
	value  string
}

func NewFilters(values url.Values) ([]Filter, error) {
	var filters []Filter

	for field, methodValues := range values {
		for _, methodValue := range methodValues {
			method, value, err := parseURLValue(methodValue)
			if err != nil {
				return nil, err
			}
			filters = append(filters, Filter{method, field, value})
		}
	}

	return filters, nil
}

func parseURLValue(urlValue string) (constant.FilterMethod, string, error) {
	split := strings.Split(urlValue, ":")
	if len(split) < 2 {
		return "", "", InvalidFilterValue(urlValue)
	}

	return constant.FilterMethod(split[0]), split[1], nil
}

type InvalidFilterValue string

func (e InvalidFilterValue) Error() string {
	return fmt.Sprintf("invalid filter value: %s", string(e))
}

func (w InvalidFilterValue) Warning() string {
	return w.Error()
}

func SelectFilter(field, value string) Filter {
	return Filter{method: constant.FilterSelect, field: field, value: value}
}

func ExcludeFilter(field, value string) Filter {
	return Filter{method: constant.FilterExclude, field: field, value: value}
}

func (f Filter) isSelect() bool {
	return f.method == constant.FilterSelect
}

func (f Filter) isExclude() bool {
	return f.method == constant.FilterExclude
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
		if filter.isExclude() && selected {
			return ships, warnings
		}
	}

	return append(ships, s), warnings
}

func (s Ship) selectBy(filter Filter) (bool, error) {
	switch filterBy := filter.field; filterBy {
	case "name":
		return s.selectByNameOrXWS(filter.value), nil
	case "faction":
		return s.selectByFaction(filter.value), nil
	case "attack", "agility", "hull", "shields":
		return s.selectByStat(filterBy, filter.value)
	case "action":
		return s.selectByAction(filter.value), nil
	case "maneuvers":
		return s.selectByManuevers(filter.value)
	case "size":
		return string(s.Size) == filter.value, nil
	case "firing_arcs":
		return s.selectByFiringArc(filter.value), nil
	case "xws":
		return s.XWS == filter.value, nil
	}

	return filter.isSelect(), UnknownFilter(filter.field)
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

func (p Pilot) AppendByFilters(pilots []Pilot, filters ...Filter) ([]Pilot, []Warning) {
	if len(filters) == 0 {
		return append(pilots, p), nil
	}

	warnings := []Warning{}
	for _, filter := range filters {
		selected, err := p.selectBy(filter)
		if err != nil {
			warnings = append(warnings, Warning{Error: err})
			continue
		}

		if filter.isSelect() && !selected {
			return pilots, warnings
		}
		if filter.isExclude() && selected {
			return pilots, warnings
		}
	}

	return append(pilots, p), warnings
}

func (p Pilot) selectBy(filter Filter) (bool, error) {
	switch filterBy := filter.field; filterBy {
	case "name":
		return p.selectByNameOrXWS(filter.value), nil
	case "ship":
		return p.Ship == filter.value, nil
	case "skill", "points":
		return p.selectByStat(filterBy, filter.value)
	case "slots":
		return p.selectBySlot(filter.value), nil
	case "faction":
		return p.selectByFaction(filter.value), nil
	case "grants":
	case "xws":
		return p.XWS == filter.value, nil
	}

	return filter.isSelect(), UnknownFilter(filter.field)
}

func (p Pilot) selectByNameOrXWS(name string) bool {
	return strings.Contains(p.Name, name) || strings.Contains(p.XWS, name)
}

func (p Pilot) selectByStat(field, value string) (bool, error) {
	intVal, err := strconv.Atoi(value)
	if err != nil {
		return false, err
	}

	switch field {
	case "skill":
		return p.Skill >= intVal, nil
	case "points":
		return p.Points >= intVal, nil
	}
	return false, nil
}

func (p Pilot) selectBySlot(slot string) bool {
	for _, pSlot := range p.Slots {
		if string(pSlot) == slot {
			return true
		}
	}
	return false
}

func (p Pilot) selectByFaction(faction string) bool {
	if strings.Contains(p.Faction.Simplify(), faction) {
		return true
	}
	if strings.Contains(string(p.Faction.ToSquadronFaction()), faction) {
		return true
	}

	return false
}

func (u Upgrade) AppendByFilters(upgrades []Upgrade, filters ...Filter) ([]Upgrade, []Warning) {
	if len(filters) == 0 {
		return append(upgrades, u), nil
	}

	warnings := []Warning{}
	for _, filter := range filters {
		selected, err := u.selectBy(filter)
		if err != nil {
			warnings = append(warnings, Warning{Error: err})
			continue
		}

		if filter.isSelect() && !selected {
			return upgrades, warnings
		}
		if filter.isExclude() && selected {
			return upgrades, warnings
		}
	}

	return append(upgrades, u), warnings
}

func (u Upgrade) selectBy(filter Filter) (bool, error) {
	switch filterBy := filter.field; filterBy {
	case "name":
		return u.selectByNameOrXWS(filter.value), nil
	case "unique":
		return u.Unique, nil
	case "limited":
		return u.Limited, nil
	case "slot":
		return string(u.Slot) == filter.value, nil
	case "points":
		return u.selectByStat(filterBy, filter.value)
	case "ship":
	case "faction":
	case "grants":
	case "xws":
		return u.XWS == filter.value, nil
	}

	return filter.isSelect(), UnknownFilter(filter.field)
}

func (u Upgrade) selectByNameOrXWS(name string) bool {
	return strings.Contains(u.Name, name) || strings.Contains(u.XWS, name)
}

func (u Upgrade) selectByStat(field, value string) (bool, error) {
	intVal, err := strconv.Atoi(value)
	if err != nil {
		return false, err
	}

	switch field {
	case "points":
		return u.Points >= intVal, nil
	}
	return false, nil
}
