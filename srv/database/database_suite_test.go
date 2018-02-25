package database_test

import (
	"io"
	"io/ioutil"
	"log"
	"os"
	"testing"

	. "github.com/vitreuz/xtmg-ref/srv/database"
)

var (
	DATA_PATH string
	IS_DB_SET bool
)

func TestMain(m *testing.M) {
	DATA_PATH = os.Getenv("DATA_PATH")
	if DATA_PATH == "" {
		DATA_PATH = "xwing.db"
	}

	if _, err := os.Stat(DATA_PATH); !os.IsNotExist(err) {
		IS_DB_SET = true
	}

	log.Println("using", DATA_PATH)

	os.Exit(m.Run())
}

func createTempDB(t *testing.T) string {
	f, err := ioutil.TempFile("", "text_xwingdb_")
	if err != nil {
		t.Fatalf("creating temp database: %v", err)
	}
	defer f.Close()

	db, err := os.Open(DATA_PATH)
	if err != nil {
		t.Fatalf("opening database: %v", err)
	}
	defer db.Close()

	if _, err := io.Copy(f, db); err != nil {
		t.Fatalf("copying contents: %v", err)
	}
	if err := f.Sync(); err != nil {
		t.Fatalf("syncing contents: %v", err)
	}

	return f.Name()
}

func createTestDB(t *testing.T, path string) *DB {
	db, err := Open(path)
	if err != nil {
		t.Fatalf("opening database: %+v", err)
	}

	return db
}
