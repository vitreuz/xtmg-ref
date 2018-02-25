package models

func (s Ship) ManeuversSummary() [][]int {
	// MaxManeuverSummary represents the total score for a ship having every
	// maneuver available as a green maneuver.
	const MaxManeuverSummary = 114
	maneuvers := s.Maneuvers

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
