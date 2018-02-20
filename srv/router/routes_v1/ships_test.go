package v1_test

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"

	"github.com/vitreuz/xtmg-ref/srv/database"

	"github.com/davecgh/go-spew/spew"
	"github.com/vitreuz/xtmg-ref/srv/models"
	. "github.com/vitreuz/xtmg-ref/srv/router/routes_v1"
)

type FakeShipDatabase struct {
	Ships []models.Ship
	Err   error
}

var databaseShipRet = []models.Ship{
	{
		Name:      "fake-ship 1",
		Maneuvers: [][]int{{0, 0, 0}, {1, 1, 1}, {1, 1, 1}},
	}, {
		Name:      "fake-ship 2",
		Maneuvers: [][]int{{0, 0, 0}, {1, 1, 1}, {1, 1, 1}},
	},
}

func (f FakeShipDatabase) ReadShips(database.ShipQuery) ([]models.Ship, error) { return f.Ships, f.Err }

type FakeShipActor struct {
	ArgShips []models.Ship

	RetShips []models.Ship
	Err      error
}

var actorShipRet = []models.Ship{
	{
		Name:      "fake-ship 1",
		Maneuvers: [][]int{{1}},
	}, {
		Name:      "fake-ship 2",
		Maneuvers: [][]int{{1}},
	},
}

func (f *FakeShipActor) ListShips(s []models.Ship) ([]models.Ship, error) {
	f.ArgShips = s
	return f.RetShips, f.Err
}

func TestListShips(t *testing.T) {
	fakeDatabase := func() *FakeShipDatabase { return &FakeShipDatabase{Ships: databaseShipRet} }
	fakeActor := func() *FakeShipActor { return &FakeShipActor{RetShips: actorShipRet} }

	type checkActorFunc func(*FakeShipActor) []error
	checkActor := func(fns ...checkActorFunc) []checkActorFunc { return fns }
	expectArgs := func(ships []models.Ship) checkActorFunc {
		return func(f *FakeShipActor) []error {
			err := []error{}

			if len(ships) != len(f.ArgShips) {
				err = append(err, fmt.Errorf(
					"expected ShipActor to receive %d ships, got %d",
					len(ships), len(f.ArgShips),
				))
			}

			for i := 0; i < len(ships) && i < len(f.ArgShips); i++ {
				ship, argShip := ships[i], f.ArgShips[i]
				if !reflect.DeepEqual(ship, argShip) {
					err = append(err, fmt.Errorf(
						"expected arg for ShipActor to be\n%+v\ngot\n%+v",
						ship, argShip,
					))
				}
			}
			return err
		}
	}

	type checkOutFunc func(*httptest.ResponseRecorder) []error
	checkOut := func(fns ...checkOutFunc) []checkOutFunc { return fns }
	expectOK := func() checkOutFunc {
		return func(w *httptest.ResponseRecorder) []error {
			if w.Result().Status != "200 OK" {
				return []error{fmt.Errorf(
					"expected to receive \"200 OK\" but got %q",
					w.Result().Status,
				)}
			}
			return nil
		}
	}

	expectHeaders := func(h http.Header) checkOutFunc {
		return func(w *httptest.ResponseRecorder) []error {
			errs := []error{}
			actualHeaders := w.Result().Header
			for k, v := range h {
				if actual, ok := actualHeaders[k]; ok {
					if !reflect.DeepEqual(actual, v) {
						errs = append(errs, fmt.Errorf(
							"expected headers for %q to be\n%v\nbut got\n%v",
							k, v, actual,
						))
					}
				} else {
					errs = append(errs, fmt.Errorf(
						"expected to have values for header %q but got none",
						k,
					))
				}
			}
			return errs
		}
	}

	tests := [...]struct {
		name     string
		setDB    *FakeShipDatabase
		setActor *FakeShipActor

		checkActor []checkActorFunc
		checkOuts  []checkOutFunc
	}{
		{
			name:     "Simple scenario",
			setDB:    fakeDatabase(),
			setActor: fakeActor(),
			checkActor: checkActor(
				expectArgs(databaseShipRet),
			),
			checkOuts: checkOut(
				expectOK(),
				expectHeaders(http.Header{
					"Content-Type": []string{"application/json"},
				}),
			),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			fakeDatabase := tt.setDB
			fakeActor := tt.setActor

			w := httptest.NewRecorder()
			r := httptest.NewRequest("GET", "/ships", nil)
			rh := NewRouteHandler(fakeDatabase, fakeActor)
			rh.ListShips(w, r)
			spew.Dump(w)
			for _, check := range tt.checkActor {
				for _, err := range check(fakeActor) {
					t.Error(err)
				}
			}

			for _, check := range tt.checkOuts {
				for _, err := range check(w) {
					t.Error(err)
				}
			}
		})
	}
}
