package database

import (
	"encoding/binary"

	"github.com/boltdb/bolt"
)

type Resource interface {
	AppendByFilter(data []byte, filters ...Filter) error
	Decode(data []byte) error
}

type Filter struct {
	method string
	field  string
	value  string
}

func (db DB) ReadResources(bucket string, resource Resource, filters ...Filter) error {
	return db.Data.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(bucket))
		return b.ForEach(func(k, v []byte) error { return resource.AppendByFilter(v, filters...) })
	})
}

func (db DB) ReadResource(bucket string, id int, resource Resource) error {
	return db.Data.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(bucket))
		return resource.Decode(b.Get(db.itob(id)))
	})
}

func (db DB) reads(bucket string, readFn func(k, v []byte) error) error {
	return db.Data.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(bucket))
		return b.ForEach(readFn)
	})
}

func (DB) itob(v int) []byte {
	b := make([]byte, 8)
	binary.BigEndian.PutUint64(b, uint64(v))
	return b
}
