package constant

type ShipSize string

const (
	SizeSmall ShipSize = "small"
	SizeLarge ShipSize = "large"
	SizeHuge  ShipSize = "huge"
)

func (s ShipSize) ToValue() int {
	switch s {
	case SizeSmall:
		return 0
	case SizeLarge:
		return 1
	case SizeHuge:
		return 2
	}

	return -1
}
