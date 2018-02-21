package main

import (
	"bytes"
	"encoding/binary"
	"encoding/gob"
	"encoding/json"
	"flag"
	"os"
	"path/filepath"

	"github.com/vitreuz/xtmg-ref/srv/database/constant"
	"github.com/vitreuz/xtmg-ref/srv/models"

	"github.com/boltdb/bolt"
	"github.com/sirupsen/logrus"
)

func init() {
	logLevel := flag.String("log-level", "info", "set the log level of the command. Can be 'panic', 'fatal', 'info', or 'debug'.")
	flag.Parse()

	switch *logLevel {
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

	if err := loadShips(db, dataPath); err != nil {
		logrus.WithError(err).Fatal("loading ships")
	}

	if err := loadPilots(db, dataPath); err != nil {
		logrus.WithError(err).Fatal("loading pilots")
	}

	if err := loadUpgrades(db, dataPath); err != nil {
		logrus.WithError(err).Fatal("loading upgrades")
	}
}

func loadShips(db *bolt.DB, path string) error {
	var ships []models.Ship

	if err := importData(filepath.Join(path, "ships.js"), "ships", &ships); err != nil {
		return err
	}

	return storeData(db, constant.ShipsBucket, func(b *bolt.Bucket) error {
		logrus.WithField("ships", len(ships)).Info("Writing ships to database...")

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

func loadPilots(db *bolt.DB, path string) error {
	var pilots []models.Pilot

	if err := importData(filepath.Join(path, "pilots.js"), "pilots", &pilots); err != nil {
		return err
	}

	return storeData(db, constant.PilotsBucket, func(b *bolt.Bucket) error {
		logrus.WithField("pilots", len(pilots)).Info("Writing pilots to database...")

		for _, pilot := range pilots {
			logrus.WithField("pilot", pilot.Name).Debugf("Writing pilot number %d...", pilot.ID)

			// Unlike the pilots, pilots must be sorted by ID because he xws
			// spec isn't guaranteed to be unique unless we specify a
			// combination of (faction, ship, pilot). It's more complicated than
			// necessary to specify the combination.
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

func loadUpgrades(db *bolt.DB, path string) error {
	var upgrades []models.Upgrade

	if err := importData(filepath.Join(path, "upgrades.js"), "upgrades", &upgrades); err != nil {
		return err
	}

	return storeData(db, constant.UpgradesBucket, func(b *bolt.Bucket) error {
		logrus.WithField("upgrades", len(upgrades)).Info("Writing upgrades to database...")

		for _, upgrade := range upgrades {
			logrus.WithField("upgrade", upgrade.Name).Debugf("Writing upgrade number %d...", upgrade.ID)

			// Similar to pilots, upgrade cannot be sorted by XWS because
			// two-sided cards have identical XWS IDs.
			id := upgrade.ID
			buf := new(bytes.Buffer)
			err := gob.NewEncoder(buf).Encode(upgrade)
			if err != nil {
				return err
			}

			b.Put(itob(id), buf.Bytes())
		}
		return nil
	})
}

func importData(path, dataType string, v interface{}) error {
	if filepath.Base(path) != dataType+".js" {
		path = filepath.Join(path, dataType+"ships.js")
	}

	logrus.WithField("path", path).Infof("Extracting %s...", dataType)
	file, err := os.Open(path)
	if err != nil {
		return err
	}
	defer file.Close()

	return json.NewDecoder(file).Decode(v)
}

func storeData(db *bolt.DB, bucketType string, fn func(bucket *bolt.Bucket) error) error {

	return db.Update(func(tx *bolt.Tx) error {
		logrus.Debugf("Creating '%s' bucket...", bucketType)
		b, err := tx.CreateBucketIfNotExists([]byte(bucketType))
		if err != nil {
			return err
		}

		return fn(b)
	})
}

func itob(v int) []byte {
	b := make([]byte, 8)
	binary.BigEndian.PutUint64(b, uint64(v))
	return b
}
