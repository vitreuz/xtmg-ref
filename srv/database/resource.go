package database

import (
	"encoding/binary"

	"github.com/boltdb/bolt"
	"github.com/vitreuz/xtmg-ref/srv/models"
)

//go:generate table-mocks $GOFILE -s Resource

type Resource interface {
	FilterDecode(data []byte, filters ...models.Filter) error
}

type Filter struct {
	method string
	field  string
	value  string
}

func (db DB) ReadResources(bucket string, resource Resource, filters ...models.Filter) error {
	return db.Data.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(bucket))
		return b.ForEach(func(k, v []byte) error { return resource.FilterDecode(v, filters...) })
	})
}

func (db DB) ReadResource(bucket string, id int, resource Resource) error {
	return db.Data.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(bucket))
		return resource.FilterDecode(b.Get(db.itob(id)))
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
