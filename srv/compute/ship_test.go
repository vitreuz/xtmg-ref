package compute

import (
	"fmt"
	"reflect"
	"testing"

	"github.com/vitreuz/xtmg-ref/srv/models"
)

func TestListShip(t *testing.T) {
	type checkOut func([]models.Ship, error) []error
	check := func(fns ...checkOut) []checkOut { return fns }

	expectNoError := func() checkOut {
		return func(ships []models.Ship, err error) []error {
			if err != nil {
				return []error{fmt.Errorf(
					"expected no error, got %v",
					err,
				)}
			}
			return nil
		}
	}
	expectShips := func(expectedShips []models.Ship) checkOut {
		return func(ships []models.Ship, err error) []error {
			errs := []error{}
			if len(ships) != len(expectedShips) {
				errs = append(errs, fmt.Errorf(
					"expected to have %d ships, but got %d",
					len(expectedShips), len(ships),
				))
			}

			for i := 0; i < len(ships) && i < len(expectedShips); i++ {
				if !reflect.DeepEqual(ships[i], expectedShips[i]) {
					errs = append(errs, fmt.Errorf(
						"expected ship %d to be\n%+v\nbut got\n%+v",
						i, expectedShips[i], ships[i],
					))
				}
			}

			return errs
		}
	}

	args := func(ships ...models.Ship) []models.Ship { return ships }
	defaultArgs := []models.Ship{
		{
			Name: "fake-ship-1",
			Maneuvers: [][]int{
				{},
				{0, 1, 1, 1, 0},
				{1, 2, 2, 2, 1},
				{0, 1, 2, 1, 0, 3},
				{0, 3, 1, 3, 0, 3},
			},
		},
	}

	tests := [...]struct {
		name   string
		ships  []models.Ship
		checks []checkOut
	}{
		{
			"Simple scenario",
			args(defaultArgs...),
			check(
				expectNoError(),
				expectShips([]models.Ship{
					{Name: "fake-ship-1", Maneuvers: [][]int{{28}}},
				}),
			),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			actor := NewActor()

			ships, err := actor.ListShips(tt.ships)
			for _, check := range tt.checks {
				for _, checkErr := range check(ships, err) {
					if checkErr != nil {
						t.Error(checkErr)
					}
				}
			}
		})
	}

}
