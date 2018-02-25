package constant

type ShipSize string

const (
	SmallShipSize ShipSize = "small"
	LargeShipSize ShipSize = "large"
	HugeShipSize  ShipSize = "huge"
)

func (s ShipSize) ToValue() int {
	switch s {
	case SmallShipSize:
		return 0
	case LargeShipSize:
		return 1
	case HugeShipSize:
		return 2
	}

	return -1
}
