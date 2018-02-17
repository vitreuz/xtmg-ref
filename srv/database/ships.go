package database

import (
	"sort"
	"strings"

	"github.com/vitreuz/xtmg-ref/srv/database/constant"
	"github.com/vitreuz/xtmg-ref/srv/models"

	"github.com/boltdb/bolt"
)

// ReadShips lists all ships that satisfy the provided queries. The default
// order is by Ship.ID.
func (db DB) ReadShips(query ShipQuery) ([]models.Ship, error) {
	ships := []models.Ship{}

	err := db.Data.View(func(tx *bolt.Tx) error {
		// Assign the bucket cursor for iteration.
		b := tx.Bucket([]byte(constant.ShipsBucket))
		c := b.Cursor()

		// Iterate and decode ships, then filter by query filters.
		for k, v := c.First(); k != nil; k, v = c.Next() {
			var ship models.Ship
			if err := decodeResource(v, &ship); err != nil {
				return err
			}

			skip := false
			for _, excluder := range query.Excluders {
				if excluder(ship) {
					skip = true
				}
			}

			if !skip {
				ships = append(ships, ship)
			}
		}

		sorters := append(query.Sort, SortByID())
		orderShipsBy(sorters...).Sort(ships)
		return nil
	})

	return ships, err
}

func (db DB) ReadShip(xws string) (models.Ship, error) {
	var ship models.Ship

	err := db.Data.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(constant.ShipsBucket))

		v := b.Get([]byte(xws))
		if len(v) < 1 {
			return UnableToLocateResourceError{XWS: xws}
		}
		return decodeResource(v, &ship)
	})

	return ship, err
}

type ShipQuery struct {
	Excluders []ShipExcluder
	Sort      []ShipSortFunc
}

type ShipExcluder func(models.Ship) bool

func SelectByName(name string) ShipExcluder {
	name = strings.ToLower(name)
	return func(ship models.Ship) bool {
		return (!strings.Contains(strings.ToLower(ship.Name), name) &&
			!strings.Contains(ship.XWS, name))
	}
}

type ShipSortFunc func(s1, s2 *models.Ship) bool

type ShipSorter struct {
	ships []models.Ship
	less  []ShipSortFunc
}

func (ss *ShipSorter) Sort(ships []models.Ship) {
	ss.ships = ships
	sort.Sort(ss)
}

func (ss *ShipSorter) Len() int { return len(ss.ships) }
func (ss *ShipSorter) Swap(i, j int) {
	ss.ships[i], ss.ships[j] = ss.ships[j], ss.ships[i]
}
func (ss *ShipSorter) Less(i, j int) bool {
	left, right := &ss.ships[i], &ss.ships[j]

	var li int
	for li = 0; li < len(ss.less)-1; li++ {
		less := ss.less[li]
		switch {
		case less(left, right):
			return true
		case less(right, left):
			return false
		}
	}

	return ss.less[li](left, right)
}

func orderShipsBy(less ...ShipSortFunc) *ShipSorter {
	return &ShipSorter{less: less}
}

func SortByID() ShipSortFunc {
	return func(s1, s2 *models.Ship) bool { return s1.ID < s2.ID }
}
