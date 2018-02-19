package v1_test

import (
	"log"
	"net/http/httptest"
	"testing"

	"github.com/vitreuz/xtmg-ref/srv/models"
	. "github.com/vitreuz/xtmg-ref/srv/router/routes_v1"
)

type FakeShipDatabase struct {
	Ships []models.Ship
	Err   error
}

func (f FakeShipDatabase) ReadShips() ([]models.Ship, error) { return f.Ships, f.Err }

type FakeShipActor struct {
	ArgShips, RetShips []models.Ship
	Err                error
}

func (f *FakeShipActor) ListShips(s []models.Ship) ([]models.Ship, error) {
	f.ArgShips = s
	return f.RetShips, f.Err
}

func TestListShips(t *testing.T) {
	FakeDB := func() *FakeShipDatabase {
		return &FakeShipDatabase{
			Ships: []models.Ship{
				{
					Name:      "fake-ship 1",
					Maneuvers: [][]int{{0, 0, 0}, {1, 1, 1}, {1, 1, 1}},
				}, {
					Name:      "fake-ship 2",
					Maneuvers: [][]int{{0, 0, 0}, {1, 1, 1}, {1, 1, 1}},
				},
			},
		}
	}

	FakeActor := func() *FakeShipActor {
		return &FakeShipActor{
			RetShips: []models.Ship{
				{
					Name:      "fake-ship 1",
					Maneuvers: [][]int{{1}},
				}, {
					Name:      "fake-ship 2",
					Maneuvers: [][]int{{1}},
				},
			},
		}
	}

	type checkActorFunc func(*FakeShipActor) error
	checkActor := func(fns ...checkActorFunc) []checkActorFunc { return fns }

	type checkOutFunc func(*httptest.ResponseRecorder) error
	checkOut := func(fns ...checkOutFunc) []checkOutFunc { return fns }

	tests := [...]struct {
		name     string
		setDB    *FakeShipDatabase
		setActor *FakeShipActor

		checkActor []checkActorFunc
		checkOuts  []checkOutFunc
	}{
		{
			name:       "Simple scenario",
			setDB:      FakeDB(),
			setActor:   FakeActor(),
			checkActor: checkActor(),
			checkOuts:  checkOut(),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			fakeDB := tt.setDB
			fakeActor := tt.setActor

			w := httptest.NewRecorder()
			r := httptest.NewRequest("GET", "/ships", nil)
			rh := NewRouteHandler(fakeDB, fakeActor)
			rh.ListShips(w, r)
			log.Println(w.Result().Status)
			for _, check := range tt.checkActor {
				if err := check(fakeActor); err != nil {
					t.Error(err)
				}
			}

			for _, check := range tt.checkOuts {
				if err := check(w); err != nil {
					t.Error(err)
				}
			}
		})
	}
}
