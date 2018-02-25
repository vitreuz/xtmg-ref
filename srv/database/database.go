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
}

func Open(path string) (*DB, error) {
	b, err := bolt.Open(path, 0655, nil)
	if err != nil {
		return nil, err
	}

	return &DB{Data: b}, nil
}

func decodeResource(data []byte, v interface{}) error {
	return gob.NewDecoder(bytes.NewBuffer(data)).Decode(v)
}

type UnableToLocateResourceError struct {
	ID int
}

func (e UnableToLocateResourceError) Error() string {
	return fmt.Sprintf("unable to locate resource %d", e.ID)
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
