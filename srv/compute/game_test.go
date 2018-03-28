package compute_test

import (
	"bytes"
	"fmt"
	"reflect"
	"testing"

	"github.com/vitreuz/xtmg-ref/srv/models"

	. "github.com/vitreuz/xtmg-ref/srv/compute"
)

func TestAggregateGame(t *testing.T) {
	body := func(js string) *bytes.Buffer {
		return bytes.NewBufferString(js)
	}
	type checkGame func(*models.Game) []error
	gameChecks := func(fns ...checkGame) []checkGame { return fns }
	expectGame := func(expect models.Game) checkGame {
		return func(actual *models.Game) []error {
			if !reflect.DeepEqual(*actual, expect) {
				return []error{fmt.Errorf(
					"expected game %+v, but got %+v", expect, *actual,
				)}
			}
			return nil
		}
	}

	tests := [...]struct {
		name       string
		game       *models.Game
		body       *bytes.Buffer
		gameChecks []checkGame
		wantErr    bool
	}{
		{
			"Should not update ID",
			&models.Game{ID: "some-id", Name: "some-name"},
			body(`{"id": "some-other-id", "name": "some-other-name"}`),
			gameChecks(
				expectGame(models.Game{ID: "some-id", Name: "some-other-name"}),
			),
			false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			actor := NewActor()
			err := actor.AggregateGame(tt.game, tt.body)
			if tt.wantErr != (err != nil) {
				t.Fatalf("unexpected error: %v", err)
			}

			for _, check := range tt.gameChecks {
				for _, err := range check(tt.game) {
					t.Error(err)
				}
			}
		})
	}
}
