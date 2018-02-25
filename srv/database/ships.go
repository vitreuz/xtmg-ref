package database

import (
	"github.com/vitreuz/xtmg-ref/srv/database/constant"
	"github.com/vitreuz/xtmg-ref/srv/models"

	"github.com/boltdb/bolt"
)

// ReadShips lists all ships that satisfy the provided queries. The default
// order is by Ship.ID.
func (db DB) ReadShips(filters ...models.Filter) ([]models.Ship, error) {
	ships := []models.Ship{}

	err := db.reads(constant.ShipsBucket, func(k, v []byte) error {
		var ship models.Ship
		if err := decodeResource(v, &ship); err != nil {
			return err
		}

		ships, _ = ship.AppendByFilters(ships, filters...)
		return nil
	})

	return ships, err
}

func (db DB) ReadShip(id int) (models.Ship, error) {
	var ship models.Ship

	err := db.Data.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(constant.ShipsBucket))

		v := b.Get(db.itob(id))
		if len(v) < 1 {
			return UnableToLocateResourceError{ID: id}
		}
		return decodeResource(v, &ship)
	})

	return ship, err
}
