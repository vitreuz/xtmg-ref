package constant

import "strings"

type Action string

const (
	ActionFocus      Action = "Focus"
	ActionJam        Action = "Jam"
	ActionRecover    Action = "Recover"
	ActionReinforce  Action = "Reinforce"
	ActionBarrelRoll Action = "Barrel Roll"
	ActionBoost      Action = "Boost"
	ActionCloak      Action = "Cloak"
	ActionCoordinate Action = "coordinate"
	ActionEvade      Action = "evade"
	ActionReload     Action = "reload"
	ActionSLAM       Action = "SLAM"
	ActionRotateArc  Action = "Rotate Arc"
	ActionTargetLock Action = "Target Lock"
)

func (a Action) Simplify() string {
	simple := strings.ToLower(string(a))
	return strings.Replace(simple, " ", "_", -1)
}
