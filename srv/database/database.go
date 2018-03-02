package database

import (
	"bytes"
	"encoding/binary"
	"encoding/gob"
	"fmt"

	"github.com/boltdb/bolt"
)

type DB struct {
	Data *bolt.DB

	shipCache  map[string]int
	pilotCache map[string]int
}

func Open(path string) (*DB, error) {

	b, err := bolt.Open(path, 0655, nil)
	if err != nil {
		return nil, err
	}

	return &DB{
		Data:      b,
		shipCache: map[string]int{}, pilotCache: map[string]int{},
	}, nil
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

func (db DB) reads(bucket string, readFn func(k, v []byte) error) error {
	return db.Data.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(bucket))
		return b.ForEach(readFn)
	})
}

func (db DB) itob(v int) []byte {
	b := make([]byte, 8)
	binary.BigEndian.PutUint64(b, uint64(v))
	return b
}
