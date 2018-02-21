package database

import (
	"github.com/vitreuz/xtmg-ref/srv/database/constant"
	"github.com/vitreuz/xtmg-ref/srv/models"

	"github.com/boltdb/bolt"
)

// ReadShips lists all ships that satisfy the provided queries. The default
// order is by Ship.ID.
func (db DB) ReadShips(filters ...ShipFilter) ([]models.Ship, error) {
	ships := []models.Ship{}

	err := db.reads(constant.ShipsBucket, func(k, v []byte) error {
		var ship models.Ship
		if err := decodeResource(v, &ship); err != nil {
			return err
		}

		ships = filterShips(ships, ship, filters...)
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

func filterShips(ships []models.Ship, ship models.Ship, filters ...ShipFilter) []models.Ship {
	if len(filters) == 0 {
		return append(ships, ship)
	}

	for _, filter := range filters {
		ships = filter(ships, ship)
	}
	return ships
}

type ShipFilter func([]models.Ship, models.Ship) []models.Ship

func SelectShipByID(id int) ShipFilter {
	return func(ships []models.Ship, ship models.Ship) []models.Ship {
		if ship.SelectByID(id) {
			return append(ships, ship)
		}
		return ships
	}
}

func SelectShipByName(name string) ShipFilter {
	return func(ships []models.Ship, ship models.Ship) []models.Ship {
		if ship.SelectByName(name) || ship.SelectByXWS(name) {
			return append(ships, ship)
		}
		return ships
	}
}
