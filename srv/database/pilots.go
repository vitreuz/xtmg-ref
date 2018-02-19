package database

import (
	"github.com/vitreuz/xtmg-ref/srv/database/constant"
	"github.com/vitreuz/xtmg-ref/srv/models"
)

func (db DB) ReadPilots() ([]models.Pilot, error) {
	pilots := []models.Pilot{}

	err := db.reads(constant.PilotsBucket, func(k, v []byte) error {
		var pilot models.Pilot
		if err := decodeResource(v, &pilot); err != nil {
			return err
		}

		pilots = append(pilots, pilot)
		return nil
	})

	return pilots, err
}
