package database

import (
	"sort"

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

	sort.Sort(PilotByID(pilots))
	return pilots, err
}

type PilotByID []models.Pilot

func (id PilotByID) Len() int           { return len(id) }
func (id PilotByID) Swap(i, j int)      { id[i], id[j] = id[j], id[i] }
func (id PilotByID) Less(i, j int) bool { return id[i].ID < id[j].ID }
