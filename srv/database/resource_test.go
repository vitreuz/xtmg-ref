package database_test

import (
	"bytes"
	"encoding/gob"
	"fmt"
	"os"
	"testing"

	"github.com/vitreuz/xtmg-ref/srv/models"

	"github.com/vitreuz/xtmg-ref/srv/database/fake"

	"github.com/vitreuz/xtmg-ref/srv/database/constant"

	. "github.com/vitreuz/xtmg-ref/srv/database"
)

type checkResource func(*fake.Resource) []error

func checkResources(fns ...checkResource) []checkResource { return fns }

func expectFirstShip(expect models.Ship) checkResource {
	return func(mock *fake.Resource) []error {
		data, _ := mock.AppendByFilterGetArgs()

		var actual models.Ship
		if err := gob.NewDecoder(bytes.NewBuffer(data)).Decode(&actual); err != nil {
			return []error{fmt.Errorf(
				"expected to be able to decode raw bytes but coudln't: %+v", err,
			)}
		}

		if actual.Name != expect.Name {
			return []error{fmt.Errorf(
				"expect to match ship %+v but got %+v", expect.Name, actual.Name,
			)}
		}

		return nil
	}
}

func expectFirstPilot(expect models.Pilot) checkResource {
	return func(mock *fake.Resource) []error {
		data, _ := mock.AppendByFilterGetArgs()

		var actual models.Pilot
		if err := gob.NewDecoder(bytes.NewBuffer(data)).Decode(&actual); err != nil {
			return []error{fmt.Errorf(
				"expected to be able to decode raw bytes but coudln't: %+v", err,
			)}
		}

		if actual.Name != expect.Name {
			return []error{fmt.Errorf(
				"expect to match pilot %+v but got %+v", expect.Name, actual.Name,
			)}
		}

		return nil
	}
}

func expectFirstUpgrade(expect models.Upgrade) checkResource {
	return func(mock *fake.Resource) []error {
		data, _ := mock.AppendByFilterGetArgs()

		var actual models.Upgrade
		if err := gob.NewDecoder(bytes.NewBuffer(data)).Decode(&actual); err != nil {
			return []error{fmt.Errorf(
				"expected to be able to decode raw bytes but coudln't: %+v", err,
			)}
		}

		if actual.Name != expect.Name {
			return []error{fmt.Errorf(
				"expect to match upgrade %+v but got %+v", expect.Name, actual.Name,
			)}
		}

		return nil
	}
}

func expectResourceCount(expect int) checkResource {
	return func(mock *fake.Resource) []error {
		actual := mock.AppendByFilterCalls
		if actual != expect {
			return []error{fmt.Errorf(
				"expectd to have %d resources but got %d", actual, expect,
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
		filters []Filter
	}
	tests := []struct {
		name           string
		args           args
		resourceChecks []checkResource
		checks         []checkErr
	}{
		{
			"Simple ship search",
			args{
				constant.ShipsBucket,
				nil,
			},
			checkResources(
				expectFirstShip(models.Ship{
					Name: "X-wing",
				}),
				expectResourceCount(56),
			),
			checks(),
		}, {
			"Simple pilot search",
			args{
				constant.PilotsBucket,
				nil,
			},
			checkResources(
				expectFirstPilot(models.Pilot{
					Name: "Wedge Antilles",
				}),
				expectResourceCount(287),
			),
			checks(),
		}, {
			"Simple upgrade search",
			args{
				constant.UpgradesBucket,
				nil,
			},
			checkResources(
				expectFirstUpgrade(models.Upgrade{
					Name: "Ion Cannon Turret",
				}),
				expectResourceCount(287),
			),
			checks(),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tmpDB := createTempDB(t)
			defer os.Remove(tmpDB)
			db := createTestDB(t, tmpDB)

			fakeResource := fake.NewResource()
			err := db.ReadResources(tt.args.bucket, fakeResource, tt.args.filters...)
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
