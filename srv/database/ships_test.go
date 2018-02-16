package database_test

import (
	"fmt"
	"os"
	"testing"

	. "github.com/vitreuz/xtmg-ref/srv/database"

	"github.com/boltdb/bolt"

	"github.com/vitreuz/xtmg-ref/srv/models"
)

func TestReadShips(t *testing.T) {
	if !IS_DB_SET {
		t.Skip("data not set")
	}

	type checkOut func([]models.Ship, error) error
	check := func(fns ...checkOut) []checkOut { return fns }
	query := func(fns ...ShipFilter) ShipQuery { return ShipQuery{Filters: fns} }

	// hasError := func(wantErr error) checkOut {
	// 	return func(ships []models.Ship, err error) error {
	// 		if err == nil || wantErr != err {
	// 			return fmt.Errorf("expected error %v, got %v", wantErr, err)
	// 		}
	// 		return nil
	// 	}
	// }

	startsWith := func(want string) checkOut {
		return func(ships []models.Ship, err error) error {
			if ship := ships[0].Name; ship != want {
				return fmt.Errorf("expected to start with %s, got %s", want, ship)
			}
			return nil
		}
	}

	hasShipCount := func(want int) checkOut {
		return func(ships []models.Ship, err error) error {
			if count := len(ships); count != want {
				return fmt.Errorf("expected to have %d ships, got %d", want, count)
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
			"Simple FilterBy",
			query(FiliterByName("tie")),
			check(
				startsWith("TIE Fighter"),
				hasShipCount(14),
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
