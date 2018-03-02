package models

import (
	"errors"
	"fmt"
	"testing"

	"github.com/vitreuz/xtmg-ref/srv/models/constant"
)

func TestShipAppendbyFilters(t *testing.T) {
	type checkOut func([]Ship, []Warning) []error
	check := func(fns ...checkOut) []checkOut { return fns }

	expectSelected := func() checkOut {
		return func(ships []Ship, warnings []Warning) []error {
			if len(ships) != 1 {
				return []error{errors.New(
					"expected ships to be selected, but it wasn't",
				)}
			}
			return nil
		}
	}

	expectExcluded := func() checkOut {
		return func(ships []Ship, warnings []Warning) []error {
			if len(ships) != 0 {
				return []error{errors.New(
					"expected ships to be excluded, but it wasn't",
				)}
			}
			return nil
		}
	}
	expectNoWarnings := func() checkOut {
		return func(ships []Ship, warnings []Warning) []error {
			if len(warnings) != 0 {
				for _, warning := range warnings {
					return []error{fmt.Errorf(
						"expected to not have any warnings but got %+v",
						warning,
					)}
				}
			}
			return nil
		}

	}
	expectWarning := func(warning Warning) checkOut {
		return func(ships []Ship, warnings []Warning) []error {
			errs := []error{}
			if len(warnings) != 1 {
				errs = append(errs, fmt.Errorf(
					"expected to have warning %+v, but got none",
					warning,
				))
			}
			return errs
		}
	}

	filter := func(filters ...Filter) []Filter { return filters }
	warning := func(err error) Warning { return Warning{Error: err} }

	tests := [...]struct {
		name    string
		ship    Ship
		filters []Filter
		checks  []checkOut
	}{
		{
			"No filters",
			Ship{Name: "fake-1"},
			nil,
			check(expectSelected(), expectNoWarnings()),
		}, {
			"bad filter",
			Ship{Name: "some-name"},
			filter(
				SelectFilter("foo", "bar"),
			),
			check(expectSelected(), expectWarning(warning(UnknownFilter("")))),
		}, {
			"Select by name (success)",
			Ship{Name: "some-name"},
			filter(
				SelectFilter("name", "some"),
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by name (failure)",
			Ship{Name: "some-name"},
			filter(
				SelectFilter("name", "foo"),
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Select by name-xws (success)",
			Ship{Name: "some-name", XWS: "bar"},
			filter(
				SelectFilter("name", "bar"),
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by name-xws (failure)",
			Ship{Name: "some-name", XWS: "bar"},
			filter(
				SelectFilter("name", "foo"),
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Select by faction (success)",
			Ship{Name: "some-name", Faction: []constant.UnitFaction{constant.FactionRebelAllicance}},
			filter(
				SelectFilter("faction", "rebel"),
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by faction (failure)",
			Ship{Name: "some-name", Faction: []constant.UnitFaction{constant.FactionRebelAllicance}},
			filter(
				SelectFilter("faction", "imp"),
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Select by stat (error)",
			Ship{Name: "some-name"},
			filter(
				SelectFilter("attacK", "u"),
			),
			check(expectSelected(), expectWarning(warning(errors.New("")))),
		}, {
			"Select by stat (success)",
			Ship{Name: "some-name", Attack: 3},
			filter(
				SelectFilter("attack", "3"),
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by stat (failure)",
			Ship{Name: "some-name", Agility: 3},
			filter(
				SelectFilter("agility", "4"),
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Exclude by stat (success)",
			Ship{Name: "some-name", Hull: 3},
			filter(
				ExcludeFilter("hull", "2"),
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Exclude by stat (failure)",
			Ship{Name: "some-name", Shields: 3},
			filter(
				ExcludeFilter("shields", "4"),
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by action (success)",
			Ship{Name: "some-name", Actions: []constant.Action{constant.ActionFocus}},
			filter(
				SelectFilter("action", "focus"),
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by action (failure)",
			Ship{Name: "some-name", Actions: []constant.Action{constant.ActionFocus}},
			filter(
				SelectFilter("action", "barrelroll"),
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Select by maneuver (success)",
			Ship{Name: "some-name", Maneuvers: [][]int{{0, 1, 1, 1}}},
			filter(
				SelectFilter("maneuvers", "0"),
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by maneuver (failure)",
			Ship{Name: "some-name", Maneuvers: [][]int{{0, 1, 1, 1}}},
			filter(
				SelectFilter("maneuvers", "100"),
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Exclude by maneuver (success)",
			Ship{Name: "some-name", Maneuvers: [][]int{{0, 1, 1, 1}}},
			filter(
				ExcludeFilter("maneuvers", "0"),
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Exclude by maneuver (failure)",
			Ship{Name: "some-name", Maneuvers: [][]int{{0, 1, 1, 1}}},
			filter(
				ExcludeFilter("maneuvers", "100"),
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by size (success)",
			Ship{Name: "some-name", Size: constant.SizeSmall},
			filter(
				SelectFilter("size", "small"),
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by size (failure)",
			Ship{Name: "some-name", Size: constant.SizeSmall},
			filter(
				SelectFilter("size", "large"),
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Exclude by size (success)",
			Ship{Name: "some-name", Size: constant.SizeSmall},
			filter(
				ExcludeFilter("size", "small"),
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Exclude by size (failure)",
			Ship{Name: "some-name", Size: constant.SizeSmall},
			filter(
				ExcludeFilter("size", "large"),
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by firing arc (success)",
			Ship{Name: "some-name", FiringArcs: []constant.FiringArc{constant.FiringArcAux180}},
			filter(
				SelectFilter("firing_arcs", "auxiliary_180"),
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by firing arc (failure)",
			Ship{Name: "some-name", FiringArcs: []constant.FiringArc{constant.FiringArcBullseye}},
			filter(
				SelectFilter("firing_arcs", "front"),
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Select by xws (success)",
			Ship{Name: "some-name", XWS: "boom"},
			filter(
				SelectFilter("xws", "boom"),
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by xws (failure)",
			Ship{Name: "some-name", XWS: "boom"},
			filter(
				SelectFilter("xws", "boo"),
			),
			check(expectExcluded(), expectNoWarnings()),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ships, warnings := tt.ship.AppendByFilters([]Ship{}, tt.filters...)
			for _, check := range tt.checks {
				for _, checkErr := range check(ships, warnings) {
					if checkErr != nil {
						t.Error(checkErr)
					}
				}
			}
		})
	}
}

func TestPilotAppendByFilters(t *testing.T) {
	type checkOut func([]Pilot, []Warning) []error
	check := func(fns ...checkOut) []checkOut { return fns }

	expectSelected := func() checkOut {
		return func(pilots []Pilot, warnings []Warning) []error {
			if len(pilots) != 1 {
				return []error{errors.New(
					"expected pilots to be selected, but it wasn't",
				)}
			}
			return nil
		}
	}
	expectExcluded := func() checkOut {
		return func(pilots []Pilot, warnings []Warning) []error {
			if len(pilots) != 0 {
				return []error{errors.New(
					"expected pilots to be excluded, but it wasn't",
				)}
			}
			return nil
		}
	}
	expectNoWarnings := func() checkOut {
		return func(pilots []Pilot, warnings []Warning) []error {
			if len(warnings) != 0 {
				for _, warning := range warnings {
					return []error{fmt.Errorf(
						"expected to not have any warnings but got %+v",
						warning,
					)}
				}
			}
			return nil
		}

	}
	expectWarning := func(warning Warning) checkOut {
		return func(pilots []Pilot, warnings []Warning) []error {
			errs := []error{}
			if len(warnings) != 1 {
				errs = append(errs, fmt.Errorf(
					"expected to have warning %+v, but got none",
					warning,
				))
			}
			return errs
		}
	}

	filter := func(filters ...Filter) []Filter { return filters }
	warning := func(err error) Warning { return Warning{Error: err} }

	tests := [...]struct {
		name    string
		pilot   Pilot
		filters []Filter
		checks  []checkOut
	}{
		{
			"No filters",
			Pilot{Name: "fake-pilot-1"},
			nil,
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Bad filter",
			Pilot{Name: "fake-pilot-1"},
			filter(SelectFilter("bad", "bar")),
			check(expectSelected(), expectWarning(warning(UnknownFilter("")))),
		}, {
			"Select by name (success)",
			Pilot{Name: "fake-pilot-1"},
			filter(SelectFilter("name", "fake")),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by name (failure)",
			Pilot{Name: "fake-pilot-1"},
			filter(SelectFilter("name", "bar")),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Select by name-xws (success)",
			Pilot{Name: "fake-pilot-1", XWS: "bar"},
			filter(SelectFilter("name", "bar")),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by ship (success)",
			Pilot{Name: "fake-pilot-1", Ship: "fake-ship"},
			filter(SelectFilter("ship", "fake-ship")),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by ship (failure)",
			Pilot{Name: "fake-pilot-1"},
			filter(SelectFilter("ship", "bar")),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Select by stat (success)",
			Pilot{Name: "fake-pilot-1", Skill: 9},
			filter(SelectFilter("skill", "9")),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by stat (failure)",
			Pilot{Name: "fake-pilot-1", Points: 20},
			filter(SelectFilter("points", "25")),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Exclude by stat (success)",
			Pilot{Name: "fake-pilot-1", Points: 25},
			filter(ExcludeFilter("points", "20")),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Exclude by stat (failure)",
			Pilot{Name: "fake-pilot-1", Skill: 5},
			filter(ExcludeFilter("skill", "7")),
			check(expectSelected(), expectNoWarnings()),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			pilots, warnings := tt.pilot.AppendByFilters([]Pilot{}, tt.filters...)
			for _, check := range tt.checks {
				for _, checkErr := range check(pilots, warnings) {
					if checkErr != nil {
						t.Error(checkErr)
					}
				}
			}
		})
	}
}
