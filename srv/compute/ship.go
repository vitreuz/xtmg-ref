package compute

import (
	"github.com/vitreuz/xtmg-ref/srv/models"
)

// ListShips will modify the raw []models.Ship object from the database. It has
// two primary components. It calculates the maneuverability metric of a ship.
// Then, it sorts the ships based.
func (a *Actor) ListShips(ships []models.Ship) ([]models.Ship, error) {
	for i := 0; i < len(ships); i++ {
		ships[i].Maneuvers = maneuversSummary(ships[i].Maneuvers)
	}

	return ships, nil
}

func maneuversSummary(maneuvers [][]int) [][]int {
	// MaxManeuverSummary represents the total score for a ship having every
	// maneuver available as a green maneuver.
	const MaxManeuverSummary = 114

	// Maneuvers are scored based on color: greens give 3, whites give 2, and
	// reds give 1.
	score := 0
	for _, row := range maneuvers {
		for _, col := range row {
			switch col {
			case 1:
				score += 2
			case 2:
				score += 3
			case 3:
				score++
			}
		}
	}

	maneuvers = [][]int{{score * 100 / MaxManeuverSummary}}
	return maneuvers
}
