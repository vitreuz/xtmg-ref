package main

import (
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"time"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/pflag"

	"github.com/vitreuz/xtmg-ref/srv/router"
)

func main() {
	var dbPath *string = pflag.StringP(
		"database-path", "d", "xwing.db",
		"sets the path to the bolt database file.",
	)
	var tempDB *bool = pflag.BoolP(
		"temp-database", "t", false,
		"specifies the usage of a temporary database as copy of the specified database",
	)
	pflag.Parse()

	if *tempDB {
		startTime := time.Now().Format("2006-01-02")
		tmp, err := ioutil.TempFile("", "xwing-"+startTime+".db")
		if err != nil {
			log.Fatal(err)
		}
		defer tmp.Close()

		src, err := os.Open(*dbPath)
		if err != nil {
			log.Fatal(err)
		}
		defer src.Close()

		io.Copy(tmp, src)
		src.Close()
		tmp.Close()

		*dbPath = tmp.Name()
		log.WithField("path", *dbPath).Info("with temporary database")
		defer os.RemoveAll(*dbPath)
	}

	router := router.NewRouter(*dbPath)
	log.Fatal(http.ListenAndServe(":1977", router))
}
