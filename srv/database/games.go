package database

import (
	"net/url"

	"github.com/vitreuz/xtmg-ref/srv/database/constant"
	"github.com/vitreuz/xtmg-ref/srv/models"
)

func (db DB) ReadGames(values url.Values) (models.Games, error) {
	var games models.Games

	filters, err := models.NewFilters(values)
	if err != nil {
		return models.Games{}, err
	}
	err = db.ReadResources(constant.GamesBucket, games, filters...)

	return games, err
}
