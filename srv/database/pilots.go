package database

import (
	"strings"

	"github.com/boltdb/bolt"
	"github.com/vitreuz/xtmg-ref/srv/database/constant"
	"github.com/vitreuz/xtmg-ref/srv/models"
)

func (db DB) ReadPilots(filters ...models.Filter) ([]models.Pilot, error) {
	pilots := []models.Pilot{}

	err := db.reads(constant.PilotsBucket, func(k, v []byte) error {
		var pilot models.Pilot
		if err := decodeResource(v, &pilot); err != nil {
			return err
		}

		pilots, _ = pilot.AppendByFilters(pilots, filters...)
		return nil
	})

	return pilots, err
}

func (db DB) ReadPilotsByShipXWS(xws string, filters ...models.Filter) ([]models.Pilot, error) {
	pilots := []models.Pilot{}

	ship, err := db.ReadShipByXWS(xws)
	if err != nil {
		return nil, err
	}

	err = db.reads(constant.PilotsBucket, func(k, v []byte) error {
		var pilot models.Pilot
		if err := decodeResource(v, &pilot); err != nil {
			return err
		}

		pilots, _ = pilot.AppendByFilters(
			pilots, append(filters, models.SelectFilter("ship", ship.Name))...,
		)
		return nil
	})

	return pilots, nil
}

func (db DB) ReadPilotByShipFactionXWS(shipXWS, faction, pilotXWS string) (models.Pilot, error) {
	unique := strings.Join([]string{shipXWS, faction, pilotXWS}, ",")
	if id, ok := db.pilotCache[unique]; ok {
		return db.readPilot(id)
	}

	ship, err := db.ReadShipByXWS(shipXWS)
	if err != nil {
		return models.Pilot{}, err
	}

	filters := []models.Filter{
		models.SelectFilter("ship", ship.Name),
		models.SelectFilter("faction", faction),
		models.SelectFilter("xws", pilotXWS),
	}

	pilots, err := db.ReadPilots(filters...)
	if err != nil {
		return models.Pilot{}, err
	}
	if len(pilots) < 1 {
		return models.Pilot{}, UnableToLocateResourceError{XWS: pilotXWS}
	}
	if len(pilots) > 1 {
		return models.Pilot{}, ImpreciseIdentifierError{XWS: pilotXWS}
	}

	db.pilotCache[unique] = pilots[0].ID
	return pilots[0], nil
}

func (db DB) readPilot(id int) (models.Pilot, error) {
	var pilot models.Pilot

	err := db.Data.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(constant.PilotsBucket))

		v := b.Get(db.itob(id))
		if len(v) < 1 {
			return UnableToLocateResourceError{ID: id}
		}
		return decodeResource(v, &pilot)
	})

	return pilot, err
}
