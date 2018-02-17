package database_test

import (
	"fmt"
	"os"
	"testing"

	"github.com/vitreuz/xtmg-ref/srv/models"
)

func TestReadPilots(t *testing.T) {

	type checkOut func([]models.Pilot, error) error
	checks := func(fns ...checkOut) []checkOut { return fns }

	startsWith := func(expectedName string) checkOut {
		return func(pilots []models.Pilot, err error) error {
			if len(pilots) < 1 {
				return fmt.Errorf(
					"expected to start with %s but got no pilots",
					expectedName,
				)
			}
			if actualName := pilots[0].Name; actualName != expectedName {
				return fmt.Errorf(
					"expected to start with %s, got %s",
					expectedName, actualName,
				)
			}
			return nil
		}
	}
	hasPilotCount := func(expectedCount int) checkOut {
		return func(pilots []models.Pilot, err error) error {
			if count := len(pilots); count != expectedCount {
				if count > 0 {
					return fmt.Errorf(
						"expected to have %d pilots, got %d",
						expectedCount, count,
					)
				}
			}
			return nil
		}
	}

	tests := [...]struct {
		name   string
		checks []checkOut
	}{
		{
			"Simple scenario",
			checks(
				startsWith("Wedge Antilles"),
				hasPilotCount(287),
			),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tmpDB := createTempDB(t)
			defer os.Remove(tmpDB)
			db := createTestDB(t, tmpDB)

			pilots, err := db.ReadPilots()
			for _, check := range tt.checks {
				if err := check(pilots, err); err != nil {
					t.Error(err)
				}
			}
		})
	}
}
