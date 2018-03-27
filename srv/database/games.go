package database

import (
	"net/url"

	"github.com/google/uuid"
	"github.com/vitreuz/xtmg-ref/srv/database/constant"
	"github.com/vitreuz/xtmg-ref/srv/models"
)

func (db DB) ReadGames(values url.Values) (*models.Games, error) {
	games := new(models.Games)

	filters, err := models.NewFilters(values)
	if err != nil {
		return nil, err
	}
	err = db.ReadResources(constant.GamesBucket, games, filters...)

	return games, err
}

func (db DB) CreateGame(game *models.Game) error {
	id, err := uuid.NewRandom()
	if err != nil {
		return err
	}

	return db.CreateResource(constant.GamesBucket, id.String(), game)

}
