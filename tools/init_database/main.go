package main

import (
	"bytes"
	"encoding/binary"
	"encoding/gob"
	"encoding/json"
	"flag"
	"os"
	"path/filepath"

	"github.com/boltdb/bolt"

	"github.com/sirupsen/logrus"
	"github.com/vitreuz/xtmg-ref/srv/models"
)

func init() {
	switch *flag.String("log-level", "info", "set the log level of the command. Can be 'panic', 'fatal', 'info', or 'debug'.") {
	case "panic":
		logrus.SetLevel(logrus.PanicLevel)
	case "fatal":
		logrus.SetLevel(logrus.FatalLevel)
	case "info":
		logrus.SetLevel(logrus.InfoLevel)
	case "debug":
		logrus.SetLevel(logrus.DebugLevel)
	}
}
func main() {
	db, err := bolt.Open("xwing.db", 0600, nil)
	if err != nil {
		logrus.WithError(err).Fatal("opening database")
	}

	dataPath := "./xwing-data/data"
	ships, err := importShips(dataPath)
	if err != nil {
		logrus.WithError(err).Fatal("importing ships")
	}

	if err := storeShips(db, ships); err != nil {
		logrus.WithError(err).Fatal("writing ships to database")
	}

	pilots, err := importPilots(dataPath)
	if err != nil {
		logrus.WithError(err).Fatal("importing ships")
	}

	if err := storePilots(db, pilots); err != nil {
		logrus.WithError(err).Fatal("writing ships to database")
	}
}

func importShips(path string) ([]models.Ship, error) {
	if filepath.Base(path) != "ships.js" {
		path = filepath.Join(path, "ships.js")
	}

	logrus.WithField("path", path).Info("Extracting ships...")
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var ships []models.Ship
	if err := json.NewDecoder(file).Decode(&ships); err != nil {
		return nil, err
	}
	logrus.WithField("ships", ships).Debug("Extracted ships.")

	return ships, nil
}

func storeShips(db *bolt.DB, ships []models.Ship) error {
	logrus.WithField("ships", len(ships)).Info("Writing ships to database...")

	return db.Update(func(tx *bolt.Tx) error {
		logrus.Debug("Creating 'ships' bucket...")
		b, err := tx.CreateBucketIfNotExists([]byte("ships"))
		if err != nil {
			return err
		}

		for _, ship := range ships {
			logrus.WithField("ship", ship.Name).Debugf("Writing ship number %d...", ship.ID)
			id := ship.ID
			buf := new(bytes.Buffer)
			err := gob.NewEncoder(buf).Encode(ship)
			if err != nil {
				return err
			}

			b.Put(itob(id), buf.Bytes())
		}

		return nil
	})
}

func importPilots(path string) ([]models.Pilot, error) {
	if filepath.Base(path) != "pilots.js" {
		path = filepath.Join(path, "pilots.js")
	}

	logrus.WithField("path", path).Info("Extracting Pilots...")
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var pilots []models.Pilot
	if err := json.NewDecoder(file).Decode(&pilots); err != nil {
		return nil, err
	}
	logrus.WithField("pilots", pilots).Debug("Extracted pilots.")

	return pilots, nil
}

func storePilots(db *bolt.DB, pilots []models.Pilot) error {
	logrus.WithField("pilots", len(pilots)).Info("Writing pilots to database...")

	return db.Update(func(tx *bolt.Tx) error {
		logrus.Debug("Creating 'pilots' bucket...")
		b, err := tx.CreateBucketIfNotExists([]byte("pilots"))
		if err != nil {
			return err
		}

		for _, pilot := range pilots {
			logrus.WithField("pilot", pilot.Name).Debugf("Writing pilot number %d...", pilot.ID)
			id := pilot.ID
			buf := new(bytes.Buffer)
			err := gob.NewEncoder(buf).Encode(pilot)
			if err != nil {
				return err
			}

			b.Put(itob(id), buf.Bytes())
		}

		return nil
	})
}

func itob(v int) []byte {
	b := make([]byte, 8)
	binary.BigEndian.PutUint64(b, uint64(v))
	return b
}
