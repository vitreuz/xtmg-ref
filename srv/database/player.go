package database

import (
	"errors"
	"net/url"

	"github.com/boltdb/bolt"
	"github.com/google/uuid"
	"github.com/vitreuz/xtmg-ref/srv/database/constant"
	"github.com/vitreuz/xtmg-ref/srv/models"
)

// To Create(a)Player we must
func (db DB) CreatePlayer(player *models.Player) (*models.Player, error) {
	id, err := uuid.NewRandom()
	if err != nil {
		return nil, err
	}
	player.ID = id.String()

	err = db.Data.Update(func(tx *bolt.Tx) error {
		filter := models.NewSelectFilter("xws", player.Ships[0].XWS)
		ships := models.NewShips()
		if err := fromTx(tx).readResources(constant.ShipsBucket, ships, filter); err != nil {
			return err
		}

		if len(ships.Ships) != 1 {
			return errors.New("invalid ship count")
		}
		player.Ships = ships.Ships

		baseXP := 8
		player.CalculateStartXP(baseXP)
		return fromTx(tx).writeResource(constant.PlayersBucket, player)
	})

	return player, err
}

func (db DB) ReadPlayers(values url.Values) (*models.Players, error) {
	players := new(models.Players)

	filters, err := models.NewFilters(values)
	if err != nil {
		return nil, err
	}
	err = db.ReadResources(constant.PlayersBucket, players, filters...)

	return players, err
}
