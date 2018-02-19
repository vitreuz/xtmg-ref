package database_test

import (
	"fmt"
	"os"
	"testing"

	"github.com/vitreuz/xtmg-ref/srv/models"
)

func TestReadUpgrades(t *testing.T) {
	if !IS_DB_SET {
		t.Skip("data not set")
	}

	type checkOut func([]models.Upgrade, error) error
	checks := func(fns ...checkOut) []checkOut { return fns }

	startsWith := func(expectedName string) checkOut {
		return func(upgrades []models.Upgrade, err error) error {
			if len(upgrades) < 1 {
				return fmt.Errorf(
					"expected to start with %s but got no upgrades",
					expectedName,
				)
			}
			if actualName := upgrades[0].Name; actualName != expectedName {
				return fmt.Errorf(
					"expected to start with %s, got %s",
					expectedName, actualName,
				)
			}
			return nil
		}
	}
	hasUpgradeCount := func(expectedCount int) checkOut {
		return func(upgrades []models.Upgrade, err error) error {
			if count := len(upgrades); count != expectedCount {
				if count > 0 {
					return fmt.Errorf(
						"expected to have %d upgrades, got %d",
						expectedCount, count,
					)
				}
			}
			return nil
		}
	}
	hasNoError := func() checkOut {
		return func(upgrades []models.Upgrade, err error) error {
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
			"Simple scenario",
			checks(
				startsWith("Ion Cannon Turret"),
				hasUpgradeCount(358),
				hasNoError(),
			),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tmpDB := createTempDB(t)
			defer os.Remove(tmpDB)
			db := createTestDB(t, tmpDB)

			upgrades, err := db.ReadUpgrades()
			for _, check := range tt.checks {
				if err := check(upgrades, err); err != nil {
					t.Error(err)
				}
			}
		})
	}
}
