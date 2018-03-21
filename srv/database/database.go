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
		_, err := tx.CreateBucketIfNotExists([]byte(constant.GamesBucket))
		return err
	})
}

func decodeResource(data []byte, v interface{}) error {
	return gob.NewDecoder(bytes.NewBuffer(data)).Decode(v)
}

type UnableToLocateResourceError struct {
	ID  int
	XWS string
}

func (e UnableToLocateResourceError) Error() string {
	if e.XWS != "" {
		return fmt.Sprintf("unable to locate resource %s", e.XWS)
	}
	return fmt.Sprintf("unable to locate resource %d", e.ID)
}

type ImpreciseIdentifierError struct {
	XWS string
}

func (e ImpreciseIdentifierError) Error() string {
	return fmt.Sprintf("%s is too imprecise for resource", e.XWS)
}
