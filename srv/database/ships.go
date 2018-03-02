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

func (db DB) ReadShipsByFaction(faction string, filters ...models.Filter) ([]models.Ship, error) {
	return db.ReadShips(append(filters, models.SelectFilter("faction", faction))...)
}

func (db DB) ReadShipByXWS(xws string) (models.Ship, error) {
	if id, ok := db.shipCache[xws]; ok {
		return db.readShip(id)
	}

	ships, err := db.ReadShips(models.SelectFilter("xws", xws))
	if err != nil {
		return models.Ship{}, err
	}
	if len(ships) != 1 {
		return models.Ship{}, UnableToLocateResourceError{XWS: xws}
	}

	db.shipCache[xws] = ships[0].ID
	return ships[0], nil
}

func (db DB) readShip(id int) (models.Ship, error) {
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
