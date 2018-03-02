package database

import (
	"github.com/vitreuz/xtmg-ref/srv/database/constant"
	"github.com/vitreuz/xtmg-ref/srv/models"
)

func (db DB) ReadUpgrades(filters ...models.Filter) ([]models.Upgrade, error) {
	upgrades := []models.Upgrade{}

	err := db.reads(constant.UpgradesBucket, func(k, v []byte) error {
		var upgrade models.Upgrade
		if err := decodeResource(v, &upgrade); err != nil {
			return err
		}

		upgrades = append(upgrades, upgrade)
		return nil
	})

	return upgrades, err
}
