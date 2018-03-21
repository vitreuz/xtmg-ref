package database_test

import (
	"bytes"
	"encoding/gob"
	"fmt"
	"log"
	"os"
	"testing"

	"github.com/vitreuz/xtmg-ref/srv/models"

	"github.com/vitreuz/xtmg-ref/srv/database/fake"

	"github.com/vitreuz/xtmg-ref/srv/database/constant"
)

type ResourceCheck func(*fake.Resource) []error

func ResourceChecks(fns ...ResourceCheck) []ResourceCheck { return fns }

type ResourcesCheck func(int, *fake.Resource) []error

func ResourcesChecks(fns ...ResourcesCheck) ResourceCheck {
	return func(mock *fake.Resource) []error {
		var errs []error
		for i, fn := range fns {
			if err := fn(i, mock); err != nil {
				errs = append(errs, err...)
			}
		}
		return errs
	}
}

func expectShip(expect models.Ship) ResourcesCheck {
	return func(i int, mock *fake.Resource) []error {
		data, _, called := mock.FilterDecodeForCall(i).GetArgs()
		if !called {
			return []error{fmt.Errorf(
				"expected to get a ship for call %d",
				i,
			)}
		}

		var actual models.Ship
		if err := gob.NewDecoder(bytes.NewBuffer(data)).Decode(&actual); err != nil {
			return []error{fmt.Errorf(
				"expected to be able to decode raw bytes but coudln't: %+v", err,
			)}
		}

		if actual.Name != expect.Name {
			return []error{fmt.Errorf(
				"expect ship %d to be %+v but got %+v", i, expect.Name, actual.Name,
			)}
		}

		return nil
	}
}

func expectPilot(expect models.Pilot) ResourcesCheck {
	return func(i int, mock *fake.Resource) []error {
		data, _, called := mock.FilterDecodeForCall(i).GetArgs()
		if !called {
			return []error{fmt.Errorf(
				"expected to get a pilot for call %d",
				i,
			)}
		}

		var actual models.Pilot
		if err := gob.NewDecoder(bytes.NewBuffer(data)).Decode(&actual); err != nil {
			return []error{fmt.Errorf(
				"expected to be able to decode raw bytes but coudln't: %+v", err,
			)}
		}

		if actual.Name != expect.Name {
			return []error{fmt.Errorf(
				"expect pilot %d to be %+v but got %+v", i, expect.Name, actual.Name,
			)}
		}

		return nil
	}
}

func expectUpgrade(expect models.Upgrade) ResourcesCheck {
	return func(i int, mock *fake.Resource) []error {
		data, _, called := mock.FilterDecodeForCall(i).GetArgs()
		if !called {
			return []error{fmt.Errorf(
				"expected to get a pilot for call %d",
				i,
			)}
		}

		var actual models.Upgrade
		if err := gob.NewDecoder(bytes.NewBuffer(data)).Decode(&actual); err != nil {
			return []error{fmt.Errorf(
				"expected to be able to decode raw bytes but coudln't: %+v", err,
			)}
		}

		if actual.Name != expect.Name {
			return []error{fmt.Errorf(
				"expect upgrade %d to be %+v but got %+v", i, expect.Name, actual.Name,
			)}
		}

		return nil
	}
}

func expectResourceCount(expect int) ResourceCheck {
	return func(mock *fake.Resource) []error {
		actual := mock.FilterDecodeCalls
		if actual != expect {
			return []error{fmt.Errorf(
				"expectd to have %d resources but got %d", expect, actual,
			)}
		}
		return nil
	}
}

func TestDB_ReadResources(t *testing.T) {
	type checkErr func(error) []error
	checks := func(fns ...checkErr) []checkErr { return fns }

	type args struct {
		bucket  string
		filters []models.Filter
	}
	tests := []struct {
		name           string
		args           args
		resource       *fake.Resource
		resourceChecks []ResourceCheck
		checks         []checkErr
	}{
		{
			"Simple ship search",
			args{
				constant.ShipsBucket,
				nil,
			},
			fake.NewResource(),
			ResourceChecks(
				ResourcesChecks(
					expectShip(models.Ship{Name: "X-wing"}),
					expectShip(models.Ship{Name: "Y-wing"}),
					expectShip(models.Ship{Name: "A-wing"}),
					expectShip(models.Ship{Name: "YT-1300"}),
				),
				expectResourceCount(56),
			),
			checks(),
		}, {
			"Simple pilot search",
			args{
				constant.PilotsBucket,
				nil,
			},
			fake.NewResource(),
			ResourceChecks(
				ResourcesChecks(
					expectPilot(models.Pilot{Name: "Wedge Antilles"}),
					expectPilot(models.Pilot{Name: "Garven Dreis"}),
					expectPilot(models.Pilot{Name: "Red Squadron Pilot"}),
				),
				expectResourceCount(287),
			),
			checks(),
		}, {
			"Simple upgrade search",
			args{
				constant.UpgradesBucket,
				nil,
			},
			fake.NewResource(),
			ResourceChecks(
				ResourcesChecks(
					expectUpgrade(models.Upgrade{Name: "Ion Cannon Turret"}),
					expectUpgrade(models.Upgrade{Name: "Proton Torpedoes"}),
				),
				expectResourceCount(358),
			),
			checks(),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tmpDB := createTempDB(t)
			defer os.Remove(tmpDB)
			db := createTestDB(t, tmpDB)

			fakeResource := tt.resource
			err := db.ReadResources(tt.args.bucket, fakeResource, tt.args.filters...)
			log.Println(err)
			for _, check := range tt.resourceChecks {
				for _, checkErr := range check(fakeResource) {
					t.Error(checkErr)
				}
			}
			for _, check := range tt.checks {
				for _, checkErr := range check(err) {
					t.Error(checkErr)
				}
			}
		})
	}
}

func TestReadResource(t *testing.T) {
	type checkErr func(error) []error
	checks := func(fns ...checkErr) []checkErr { return fns }

	type args struct {
		bucket string
		id     int
	}
	tests := [...]struct {
		name           string
		args           args
		resourceChecks []ResourceCheck
		errChecks      []checkErr
	}{
		{
			"Ship search",
			args{
				constant.ShipsBucket,
				12,
			},
			ResourceChecks(),
			checks(),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tmpDB := createTempDB(t)
			defer os.Remove(tmpDB)
			db := createTestDB(t, tmpDB)

			fakeResource := fake.NewResource()
			err := db.ReadResource(tt.args.bucket, tt.args.id, fakeResource)
			for _, check := range tt.resourceChecks {
				for _, checkErr := range check(fakeResource) {
					t.Error(checkErr)
				}
			}
			for _, check := range tt.errChecks {
				for _, checkErr := range check(err) {
					t.Error(checkErr)
				}
			}
		})
	}
}
