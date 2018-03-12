package fake

type ShipActor struct {
	listShipsMethod map[int]ShipActorListShipsMethod
	listShipsMutex  sync.RWMutex
}
type ShipActorListShipsMethod struct {
	ShipArrArg    []models.Ship
	StringVarArg  ...string
	Called        bool
	ShipArrResult []models.Ship
	ErrResult     error
}

func NewShipActor() *ShipActor {
	fake := &ShipActor{}
	fake.listShipsMethod = make(map[int]ShipActorListShipsMethod)
	return fake
}
func (fake *ShipActor) ListShips(shipArrArg []models.Ship, stringVarArg ...string) (shipArrResult []models.Ship, errResult error) {
	fake.listShipsMutex.Lock()
	fakeMethod := fake.listShipsMethod[fake.listShipsCalls]
	fakeMethod.ShipArrArg = shipArrArg
	fakeMethod.StringVarArg = stringVarArg
	fake.listShipsMethod[fake.listShipsCalls] = fakeMethod
	fake.listShipsCalls++
	fake.listShipsMutex.Unlock()
	return fakeMethod.ShipArrResult, fakeMethod.ErrResult
}
func (fake *ShipActor) ListShipsReturns(shipArrResult []models.Ship, errResult error) *ShipActor {
	fake.listShipsMutex.Lock()
	fakeMethod := fake.listShipsMethod[0]
	fakeMethod.ShipArrResult = shipArrResult
	fakeMethod.ErrResult = errResult
	fake.listShipsMethod[0] = fakeMethod
	fake.listShipsMutex.Unlock()
	return fake
}
func (fake *ShipActor) ListShipsGetArgs() (shipArrArg []models.Ship, stringVarArg ...string) {
	fake.listShipsMutex.RLock()
	shipArrArg = fake.listShipsMethod[0].ShipArrArg
	stringVarArg = fake.listShipsMethod[0].StringVarArg
	fake.listShipsMutex.RUnlock()
	return shipArrArg, stringVarArg
}

type ShipActorListShipsFunc func(ShipActorListShipsMethod) ShipActorListShipsMethod

func (fake *ShipActor) ListShipsForCall(call int, fns ...ShipActorListShipsFunc) *ShipActor {
	fake.listShipsMutex.Lock()
	for _, fn := range fns {
		fakeMethod := fake.listShipsMethod[call]
		fake.listShipsMethod[call] = fn(fakeMethod)
	}
	fake.listShipsMutex.Unlock()
	return fake
}
