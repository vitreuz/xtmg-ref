package database

import (
	"log"
	"sort"

	"github.com/vitreuz/xtmg-ref/srv/database/constant"
	"github.com/vitreuz/xtmg-ref/srv/models"
)

func (db DB) ReadUpgrades() ([]models.Upgrade, error) {
	upgrades := []models.Upgrade{}

	err := db.reads(constant.UpgradesBucket, func(k, v []byte) error {
		var upgrade models.Upgrade
		if err := decodeResource(v, &upgrade); err != nil {
			return err
		}

		log.Println(upgrade.Name)
		upgrades = append(upgrades, upgrade)
		return nil
	})

	sort.Sort(UpgradeByID(upgrades))
	return upgrades, err
}

type UpgradeByID []models.Upgrade

func (id UpgradeByID) Len() int           { return len(id) }
func (id UpgradeByID) Swap(i, j int)      { id[i], id[j] = id[j], id[i] }
func (id UpgradeByID) Less(i, j int) bool { return id[i].ID < id[j].ID }
