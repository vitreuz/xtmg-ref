package database_test

import (
	"fmt"
	"os"
	"testing"

	"github.com/vitreuz/xtmg-ref/srv/models"
)

func TestReadPilots(t *testing.T) {
	if !IS_DB_SET {
		t.Skip("data not set")
	}

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
	hasNoError := func() checkOut {
		return func(pilots []models.Pilot, err error) error {
			if err != nil {
				return fmt.Errorf(
					"expected no error but got %v",
					err,
				)
			}
			return nil
		}
	}

	tests := [...]struct {
		name   string
		checks []checkOut
	}{
		{
			"simple scenario",
			checks(
				startsWith("Wedge Antilles"),
				hasPilotCount(287),
				hasNoError(),
			),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tmpdb := createTempDB(t)
			defer os.Remove(tmpdb)
			db := createTestDB(t, tmpdb)

			pilots, err := db.ReadPilots()
			for _, check := range tt.checks {
				if err := check(pilots, err); err != nil {
					t.Error(err)
				}
			}
		})
	}
}

func TestReadPilotsByShipXWS(t *testing.T) {
	if !IS_DB_SET {
		t.Skip("data not set")
	}
	type checkOut func([]models.Pilot, error) error
	check := func(fns ...checkOut) []checkOut { return fns }

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
	hasNoError := func() checkOut {
		return func(pilots []models.Pilot, err error) error {
			if err != nil {
				return fmt.Errorf(
					"expected no error but got %v",
					err,
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
			"Simple scenario",
			"xwing",
			check(
				startsWith("Wedge Antilles"),
				hasPilotCount(11),
				hasNoError(),
			),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tmpdb := createTempDB(t)
			defer os.Remove(tmpdb)
			db := createTestDB(t, tmpdb)

			pilots, err := db.ReadPilotsByShipXWS(tt.ship)
			for _, check := range tt.checks {
				if err := check(pilots, err); err != nil {
					t.Error(err)
				}
			}
		})
	}
}
