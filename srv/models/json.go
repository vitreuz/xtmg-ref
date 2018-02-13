package models

import (
	"encoding/json"
	"fmt"
)

// UnmarshalJSON satisfies the unmarshaller interface for Pilot. This is
// necessary because the fields Skill and Points may not be integers.
func (p *Pilot) UnmarshalJSON(v []byte) error {
	type alias Pilot
	aux := struct {
		Skill  interface{} `json:"skill"`
		Points interface{} `json:"points"`
		alias
	}{
		alias: alias(*p),
	}

	if err := json.Unmarshal(v, &aux); err != nil {
		return err
	}

	skill, err := itoi(aux.Skill, "Skill")
	if err != nil {
		return err
	}
	points, err := itoi(aux.Points, "Points")
	if err != nil {
		return err
	}
	p.Skill = skill
	p.Points = points
	return nil
}

func itoi(v interface{}, field string) (int, error) {
	var i int
	switch val := v.(type) {
	case string:
		i = -1
	case float64:
		i = int(val)
	default:
		return 0, fmt.Errorf("Unable to unmarshal %s into field %s", val, field)
	}
	return i, nil
}
