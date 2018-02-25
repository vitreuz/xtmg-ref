package models

func (left *Ship) Less(sortBy string, right *Ship) bool {
	switch sortBy {
	case "id":
		return left.ID < right.ID
	case "attack":
		return left.Attack < right.Attack
	case "agility":
		return left.Agility < right.Agility
	case "hull":
		return left.Hull < right.Hull
	case "shields":
		return left.Shields < right.Shields
	case "size":
		return left.Size.ToValue() < right.Size.ToValue()
	case "maneuvers":
		return left.Maneuvers[0][0] < right.Maneuvers[0][0]
	}

	return false
}
