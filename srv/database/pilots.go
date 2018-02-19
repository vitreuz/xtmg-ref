package database

import (
	"log"
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

		log.Println(pilot.Name)
		pilots = append(pilots, pilot)
		return nil
	})

	sort.Sort(ByID(pilots))
	return pilots, err
}

type Resource interface {
	ID() int
}

type ByID []models.Pilot

func (id ByID) Len() int           { return len(id) }
func (id ByID) Swap(i, j int)      { id[i], id[j] = id[j], id[i] }
func (id ByID) Less(i, j int) bool { return id[i].ID < id[j].ID }
