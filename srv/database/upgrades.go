package database

import (
	"strconv"

	"github.com/boltdb/bolt"
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

		upgrades, _ = upgrade.AppendByFilters(upgrades, filters...)
		return nil
	})

	return upgrades, err
}

func (db DB) ReadUpgradeByXWS(xws string) (models.Upgrade, error) {
	if id, ok := db.upgradeCache[xws]; ok {
		return db.readUpgrade(id)
	}

	upgrades, err := db.ReadUpgrades(models.SelectFilter("xws", xws))
	if err != nil {
		return models.Upgrade{}, err
	}
	if len(upgrades) != 1 {
		return models.Upgrade{}, UnableToLocateResourceError(xws)
	}

	db.upgradeCache[xws] = upgrades[0].ID
	return upgrades[0], nil
}

func (db DB) readUpgrade(id int) (models.Upgrade, error) {
	var upgrade models.Upgrade

	err := db.Data.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(constant.ShipsBucket))

		v := b.Get(db.itob(id))
		if len(v) < 1 {
			return UnableToLocateResourceError(strconv.Itoa(id))
		}
		return decodeResource(v, &upgrade)
	})

	return upgrade, err
}
