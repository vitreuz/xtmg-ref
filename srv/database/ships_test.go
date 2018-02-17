package database_test

import (
	"fmt"
	"os"
	"reflect"
	"testing"

	. "github.com/vitreuz/xtmg-ref/srv/database"
	"github.com/vitreuz/xtmg-ref/srv/models"

	"github.com/boltdb/bolt"
)

func TestReadShips(t *testing.T) {
	if !IS_DB_SET {
		t.Skip("data not set")
	}

	type checkOut func([]models.Ship, error) error
	check := func(fns ...checkOut) []checkOut { return fns }
	query := func(fns ...ShipExcluder) ShipQuery {
		return ShipQuery{Excluders: fns}
	}

	// hasError := func(wantErr error) checkOut {
	// 	return func(ships []models.Ship, err error) error {
	// 		if err == nil || wantErr != err {
	// 			return fmt.Errorf("expected error %v, got %v", wantErr, err)
	// 		}
	// 		return nil
	// 	}
	// }

	startsWith := func(expectedName string) checkOut {
		return func(ships []models.Ship, err error) error {
			if len(ships) < 1 {
				return fmt.Errorf(
					"expected to start with %s but got no ships",
					expectedName,
				)
			}
			if actualName := ships[0].Name; actualName != expectedName {
				return fmt.Errorf(
					"expected to start with %s, got %s",
					expectedName, actualName,
				)
			}
			return nil
		}
	}
	hasShipCount := func(expectedCount int) checkOut {
		return func(ships []models.Ship, err error) error {
			if count := len(ships); count != expectedCount {
				if count > 0 {
					return fmt.Errorf(
						"expected to have %d ships, got %d",
						expectedCount, count,
					)
				}
			}
			return nil
		}
	}

	tests := [...]struct {
		name   string
		query  ShipQuery
		checks []checkOut
	}{
		{
			"Simple Scenario",
			query(),
			check(
				startsWith("X-wing"),
				hasShipCount(56),
			),
		}, {
			"Simple select By Name",
			query(SelectByName("tie")),
			check(
				startsWith("TIE Fighter"),
				hasShipCount(14),
			),
		}, {
			"Using xws as name",
			query(SelectByName("tief")),
			check(
				startsWith("TIE Fighter"),
				hasShipCount(2),
			),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tempDB := createTempDB(t)
			defer os.Remove(tempDB)

			b, err := bolt.Open(tempDB, 0600, nil)
			if err != nil {
				t.Fatalf("setup: opening bolt db: %v", err)
			}

			db := DB{b}
			ships, err := db.ReadShips(tt.query)
			for _, check := range tt.checks {
				if err := check(ships, err); err != nil {
					t.Error(err)
				}
			}

		})
	}
}

func TestReadShip(t *testing.T) {
	if !IS_DB_SET {
		t.Skip("data not set")
	}

	type checkOut func(models.Ship, error) error
	check := func(fns ...checkOut) []checkOut { return fns }

	expectError := func(expectedError error) checkOut {
		return func(ship models.Ship, err error) error {
			if err == nil {
				return fmt.Errorf(
					"expected an error of type '%T' but got no error",
					expectedError,
				)
			}
			if reflect.TypeOf(err) != reflect.TypeOf(expectedError) {
				return fmt.Errorf(
					"expected an error of type '%T', got '%T'",
					expectedError, err,
				)
			}
			return nil
		}
	}
	expectShip := func(expectedName string) checkOut {
		return func(ship models.Ship, err error) error {
			if actualName := ship.Name; expectedName != actualName {
				return fmt.Errorf(
					"expected ship %s, got %s",
					expectedName, actualName,
				)
			}
			return nil
		}
	}

	tests := [...]struct {
		name   string
		ship   string
		checks []checkOut
	}{
		{
			"Simple Scenario",
			"xwing",
			check(
				expectShip("X-wing"),
			),
		}, {
			"Unable to find resource",
			"some-fake-ship",
			check(
				expectError(UnableToLocateResourceError{}),
			),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tempDB := createTempDB(t)
			defer os.Remove(tempDB)

			b, err := bolt.Open(tempDB, 0600, nil)
			if err != nil {
				t.Fatalf("setup: opening bolt db: %v", err)
			}

			db := DB{b}
			ship, err := db.ReadShip(tt.ship)
			for _, check := range tt.checks {
				if err := check(ship, err); err != nil {
					t.Error(err)
				}
			}
		})
	}
}
