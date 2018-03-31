package v1

import (
	"net/http"

	log "github.com/sirupsen/logrus"
)

// hanldeError writes to the DebugLogger and to the response. It returns true if
// the error should be fatal for the request.
func handleError(w http.ResponseWriter, err error) bool {
	log.WithError(err).Error()
	http.Error(w, err.Error(), http.StatusInternalServerError)

	switch err.(type) {
	default:
	}
	return true
}
