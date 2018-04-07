package database

import (
	"bytes"
	"encoding/gob"
	"fmt"

	"github.com/vitreuz/xtmg-ref/srv/database/constant"

	"github.com/boltdb/bolt"
)

//go:generate table-mocks $GOFILE -s Resource

type DB struct {
	Data *bolt.DB

	shipCache    map[string]int
	pilotCache   map[string]int
	upgradeCache map[string]int
}

func Open(path string) (*DB, error) {

	b, err := bolt.Open(path, 0655, nil)
	if err != nil {
		return nil, err
	}
	if err := seedBolt(b); err != nil {
		return nil, err
	}

	return &DB{
		Data:      b,
		shipCache: map[string]int{}, pilotCache: map[string]int{}, upgradeCache: map[string]int{},
	}, nil
}

func seedBolt(db *bolt.DB) error {
	return db.Update(func(tx *bolt.Tx) error {
		for _, bucket := range []string{
			constant.GamesBucket,
			constant.PlayersBucket,
		} {
			if _, err := tx.CreateBucketIfNotExists([]byte(bucket)); err != nil {
				return err
			}
		}

		return nil
	})
}

func decodeResource(data []byte, v interface{}) error {
	return gob.NewDecoder(bytes.NewBuffer(data)).Decode(v)
}

type UnableToLocateResourceError string

func (e UnableToLocateResourceError) Error() string {
	return fmt.Sprintf("unable to locate resource %s", string(e))
}

type ImpreciseIdentifierError struct {
	XWS string
}

func (e ImpreciseIdentifierError) Error() string {
	return fmt.Sprintf("%s is too imprecise for resource", e.XWS)
}
