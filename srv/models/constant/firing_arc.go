package constant

import "strings"

type FiringArc string

const (
	FiringArcAux180   FiringArc = "Auxiliary 180"
	FiringArcAuxRear  FiringArc = "Auxiliary Rear"
	FiringArcBullseye FiringArc = "Bullseye"
	FiringArcFront    FiringArc = "Front"
	FiringArcMobile   FiringArc = "Mobile"
	FiringArcTurret   FiringArc = "Turret"
)

func (f FiringArc) Simplify() string {
	simple := strings.ToLower(string(f))
	return strings.Replace(simple, " ", "_", -1)
}
