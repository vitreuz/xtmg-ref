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
				Filter{"select", "foo", "bar"},
			),
			check(expectSelected(), expectWarning(warning(UnknownFilter("")))),
		}, {
			"Select by name (success)",
			Ship{Name: "some-name"},
			filter(
				Filter{"select", "name", "some"},
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by name (failure)",
			Ship{Name: "some-name"},
			filter(
				Filter{"select", "name", "foo"},
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Select by name-xws (success)",
			Ship{Name: "some-name", XWS: "bar"},
			filter(
				Filter{"select", "name", "bar"},
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by name-xws (failure)",
			Ship{Name: "some-name", XWS: "bar"},
			filter(
				Filter{"select", "name", "foo"},
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Select by faction (success)",
			Ship{Name: "some-name", Faction: []constant.UnitFaction{constant.FactionRebelAllicance}},
			filter(
				Filter{"select", "faction", "rebel"},
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by faction (failure)",
			Ship{Name: "some-name", Faction: []constant.UnitFaction{constant.FactionRebelAllicance}},
			filter(
				Filter{"select", "faction", "imp"},
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Select by stat (error)",
			Ship{Name: "some-name"},
			filter(
				Filter{"select", "attack", "u"},
			),
			check(expectSelected(), expectWarning(warning(errors.New("")))),
		}, {
			"Select by stat (success)",
			Ship{Name: "some-name", Attack: 3},
			filter(
				Filter{"select", "attack", "3"},
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by stat (failure)",
			Ship{Name: "some-name", Agility: 3},
			filter(
				Filter{"select", "agility", "4"},
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Exclude by stat (success)",
			Ship{Name: "some-name", Hull: 3},
			filter(
				Filter{"exclude", "hull", "2"},
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Exclude by stat (failure)",
			Ship{Name: "some-name", Shields: 3},
			filter(
				Filter{"exclude", "shields", "4"},
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by action (success)",
			Ship{Name: "some-name", Actions: []constant.Action{constant.ActionFocus}},
			filter(
				Filter{"select", "action", "focus"},
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by action (failure)",
			Ship{Name: "some-name", Actions: []constant.Action{constant.ActionFocus}},
			filter(
				Filter{"select", "action", "barrelroll"},
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Select by maneuver (success)",
			Ship{Name: "some-name", Maneuvers: [][]int{{0, 1, 1, 1}}},
			filter(
				Filter{"select", "maneuvers", "0"},
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by maneuver (failure)",
			Ship{Name: "some-name", Maneuvers: [][]int{{0, 1, 1, 1}}},
			filter(
				Filter{"select", "maneuvers", "100"},
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Exclude by maneuver (success)",
			Ship{Name: "some-name", Maneuvers: [][]int{{0, 1, 1, 1}}},
			filter(
				Filter{"exclude", "maneuvers", "0"},
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Exclude by maneuver (failure)",
			Ship{Name: "some-name", Maneuvers: [][]int{{0, 1, 1, 1}}},
			filter(
				Filter{"exclude", "maneuvers", "100"},
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by size (success)",
			Ship{Name: "some-name", Size: constant.SizeSmall},
			filter(
				Filter{"select", "size", "small"},
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by size (failure)",
			Ship{Name: "some-name", Size: constant.SizeSmall},
			filter(
				Filter{"select", "size", "large"},
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Exclude by size (success)",
			Ship{Name: "some-name", Size: constant.SizeSmall},
			filter(
				Filter{"exclude", "size", "small"},
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Exclude by size (failure)",
			Ship{Name: "some-name", Size: constant.SizeSmall},
			filter(
				Filter{"exclude", "size", "large"},
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by firing arc (success)",
			Ship{Name: "some-name", FiringArcs: []constant.FiringArc{constant.FiringArcAux180}},
			filter(
				Filter{"select", "firing_arcs", "auxiliary_180"},
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by firing arc (failure)",
			Ship{Name: "some-name", FiringArcs: []constant.FiringArc{constant.FiringArcBullseye}},
			filter(
				Filter{"select", "firing_arcs", "front"},
			),
			check(expectExcluded(), expectNoWarnings()),
		}, {
			"Select by xws (success)",
			Ship{Name: "some-name", XWS: "boom"},
			filter(
				Filter{"select", "xws", "boo"},
			),
			check(expectSelected(), expectNoWarnings()),
		}, {
			"Select by xws (failure)",
			Ship{Name: "some-name", XWS: "boom"},
			filter(
				Filter{"select", "xws", "bar"},
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
