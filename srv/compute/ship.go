package compute

import (
	"sort"

	"github.com/vitreuz/xtmg-ref/srv/models"
)

// ListShips will modify the raw []models.Ship object from the database. It has
// two primary components. It calculates the maneuverability metric of a ship.
// Then, it sorts the ships based.
func (a *Actor) ListShips(ships []models.Ship, sortBy ...string) ([]models.Ship, error) {
	for i := 0; i < len(ships); i++ {
		ships[i].Maneuvers = ships[i].ManeuversSummary()
	}

	SortBy(sortBy...).Sort(ships)
	return ships, nil
}

type shipSorter struct {
	sortBy []string
	ships  []models.Ship
}

func SortBy(sortBy ...string) *shipSorter { return &shipSorter{sortBy: sortBy} }
func (s *shipSorter) Sort(ships []models.Ship) {
	s.ships = ships
	sort.Sort(s)
}

func (s *shipSorter) Len() int      { return len(s.ships) }
func (s *shipSorter) Swap(i, j int) { s.ships[i], s.ships[j] = s.ships[j], s.ships[i] }
func (s *shipSorter) Less(i, j int) bool {
	left, right := &s.ships[i], &s.ships[j]

	for _, sortBy := range s.sortBy {
		switch {
		case left.Less(sortBy, right):
			return true
		case right.Less(sortBy, left):
			return false
		}
	}

	// If we get here, then both are equal and we return false.
	return false
}
