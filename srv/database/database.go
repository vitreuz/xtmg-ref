package database

import (
	"bytes"
	"encoding/gob"
	"fmt"

	"github.com/boltdb/bolt"
)

type DB struct {
	Data *bolt.DB
}

func Open() *DB {
	return nil
}

func decodeResource(data []byte, v interface{}) error {
	return gob.NewDecoder(bytes.NewBuffer(data)).Decode(v)
}

type UnableToLocateResourceError struct {
	XWS string
}

func (e UnableToLocateResourceError) Error() string {
	return fmt.Sprintf("unable to locate resource %s", e.XWS)
}

func (db DB) reads(bucket string, readFn func(k, v []byte) error) error {
	return db.Data.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(bucket))
		return b.ForEach(readFn)
	})
}
