package database

import (
	"bytes"
	"encoding/gob"
	"strings"

	"github.com/boltdb/bolt"

	"github.com/vitreuz/xtmg-ref/srv/database/constant"
	"github.com/vitreuz/xtmg-ref/srv/models"
)

type DB struct {
	Data *bolt.DB
}

func Open() *DB {
	return nil
}

func (db DB) ReadShips(query ShipQuery) ([]models.Ship, error) {
	ships := []models.Ship{}

	err := db.Data.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(constant.ShipsBucket))

		c := b.Cursor()

		for k, v := c.First(); k != nil; k, v = c.Next() {
			var ship models.Ship
			buf := bytes.NewBuffer(v)
			if err := gob.NewDecoder(buf).Decode(&ship); err != nil {
				return err
			}

			skip := false
			for _, filter := range query.Filters {
				if filter(ship) {
					skip = true
				}
			}

			if !skip {
				ships = append(ships, ship)
			}
		}

		return nil
	})

	return ships, err
}

type ShipQuery struct {
	Filters []ShipFilter
}

type ShipFilter func(models.Ship) bool

func FiliterByName(text string) ShipFilter {
	return func(ship models.Ship) bool {
		return !strings.Contains(strings.ToLower(ship.Name), text)
	}
}
