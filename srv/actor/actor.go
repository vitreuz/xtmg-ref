package actor

import "github.com/vitreuz/xtmg-ref/srv/models"

type Actor struct{}

func NewActor() *Actor {
	return &Actor{}
}

func (a *Actor) ListShips([]models.Ship) ([]models.Ship, error) {
	return nil, nil
}
