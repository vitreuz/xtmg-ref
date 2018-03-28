package database

import (
	"encoding/binary"

	"github.com/boltdb/bolt"
	"github.com/vitreuz/xtmg-ref/srv/models"
)

//go:generate table-mocks $GOFILE -s Resource

type ResourceDecoder interface {
	FilterDecode(data []byte, filters ...models.Filter) error
}

type ResourceEncoder interface {
	IDBytes() []byte
	Encode() ([]byte, error)
}

type Filter struct {
	method string
	field  string
	value  string
}

func (db DB) ReadResources(bucket string, resource ResourceDecoder, filters ...models.Filter) error {
	return db.Data.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(bucket))
		return b.ForEach(func(k, v []byte) error { return resource.FilterDecode(v, filters...) })
	})
}

func (db DB) ReadResource(bucket string, id string, resource ResourceDecoder) error {
	return db.Data.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(bucket))
		return resource.FilterDecode(b.Get([]byte(id)))
	})
}

func (db DB) WriteResource(bucket string, resource ResourceEncoder) error {
	return db.Data.Update(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(bucket))

		data, err := resource.Encode()
		if err != nil {
			return err
		}
		return b.Put(resource.IDBytes(), data)
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
