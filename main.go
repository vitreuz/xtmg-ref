package main

import (
	"log"
	"net/http"

	"github.com/spf13/pflag"

	"github.com/vitreuz/xtmg-ref/srv/router"
)

func main() {
	var dbPath *string = pflag.StringP(
		"database-path", "d", "xwing.db",
		"sets the path to the bolt database file.",
	)

	router := router.NewRouter(*dbPath)
	log.Fatal(http.ListenAndServe(":1977", router))
}
