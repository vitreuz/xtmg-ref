package fake

type ShipDatabase struct {
	readShipsMethod          map[int]ShipDatabaseReadShipsMethod
	readShipsMutex           sync.RWMutex
	readShipsByFactionMethod map[int]ShipDatabaseReadShipsByFactionMethod
	readShipsByFactionMutex  sync.RWMutex
	readShipByXWSMethod      map[int]ShipDatabaseReadShipByXWSMethod
	readShipByXWSMutex       sync.RWMutex
}
type ShipDatabaseReadShipsMethod struct {
	Filters ...models.Filter
	Called  bool
	Ships   []models.Ship
	Err     error
}
type ShipDatabaseReadShipsByFactionMethod struct {
	StringArg     string
	FilterVarArg  ...models.Filter
	Called        bool
	ShipArrResult []models.Ship
	ErrResult     error
}
type ShipDatabaseReadShipByXWSMethod struct {
	StringArg  string
	Called     bool
	ShipResult models.Ship
	ErrResult  error
}

func NewShipDatabase() *ShipDatabase {
	fake := &ShipDatabase{}
	fake.readShipsMethod = make(map[int]ShipDatabaseReadShipsMethod)
	fake.readShipsByFactionMethod = make(map[int]ShipDatabaseReadShipsByFactionMethod)
	fake.readShipByXWSMethod = make(map[int]ShipDatabaseReadShipByXWSMethod)
	return fake
}
func (fake *ShipDatabase) ReadShips(filters ...models.Filter) (ships []models.Ship, err error) {
	fake.readShipsMutex.Lock()
	fakeMethod := fake.readShipsMethod[fake.readShipsCalls]
	fakeMethod.Filters = filters
	fake.readShipsMethod[fake.readShipsCalls] = fakeMethod
	fake.readShipsCalls++
	fake.readShipsMutex.Unlock()
	return fakeMethod.Ships, fakeMethod.Err
}
func (fake *ShipDatabase) ReadShipsReturns(ships []models.Ship, err error) *ShipDatabase {
	fake.readShipsMutex.Lock()
	fakeMethod := fake.readShipsMethod[0]
	fakeMethod.Ships = ships
	fakeMethod.Err = err
	fake.readShipsMethod[0] = fakeMethod
	fake.readShipsMutex.Unlock()
	return fake
}
func (fake *ShipDatabase) ReadShipsGetArgs() (filters ...models.Filter) {
	fake.readShipsMutex.RLock()
	filters = fake.readShipsMethod[0].Filters
	fake.readShipsMutex.RUnlock()
	return filters
}

type ShipDatabaseReadShipsFunc func(ShipDatabaseReadShipsMethod) ShipDatabaseReadShipsMethod

func (fake *ShipDatabase) ReadShipsForCall(call int, fns ...ShipDatabaseReadShipsFunc) *ShipDatabase {
	fake.readShipsMutex.Lock()
	for _, fn := range fns {
		fakeMethod := fake.readShipsMethod[call]
		fake.readShipsMethod[call] = fn(fakeMethod)
	}
	fake.readShipsMutex.Unlock()
	return fake
}
func (fake *ShipDatabase) ReadShipsByFaction(stringArg string, filterVarArg ...models.Filter) (shipArrResult []models.Ship, errResult error) {
	fake.readShipsByFactionMutex.Lock()
	fakeMethod := fake.readShipsByFactionMethod[fake.readShipsByFactionCalls]
	fakeMethod.StringArg = stringArg
	fakeMethod.FilterVarArg = filterVarArg
	fake.readShipsByFactionMethod[fake.readShipsByFactionCalls] = fakeMethod
	fake.readShipsByFactionCalls++
	fake.readShipsByFactionMutex.Unlock()
	return fakeMethod.ShipArrResult, fakeMethod.ErrResult
}
func (fake *ShipDatabase) ReadShipsByFactionReturns(shipArrResult []models.Ship, errResult error) *ShipDatabase {
	fake.readShipsByFactionMutex.Lock()
	fakeMethod := fake.readShipsByFactionMethod[0]
	fakeMethod.ShipArrResult = shipArrResult
	fakeMethod.ErrResult = errResult
	fake.readShipsByFactionMethod[0] = fakeMethod
	fake.readShipsByFactionMutex.Unlock()
	return fake
}
func (fake *ShipDatabase) ReadShipsByFactionGetArgs() (stringArg string, filterVarArg ...models.Filter) {
	fake.readShipsByFactionMutex.RLock()
	stringArg = fake.readShipsByFactionMethod[0].StringArg
	filterVarArg = fake.readShipsByFactionMethod[0].FilterVarArg
	fake.readShipsByFactionMutex.RUnlock()
	return stringArg, filterVarArg
}

type ShipDatabaseReadShipsByFactionFunc func(ShipDatabaseReadShipsByFactionMethod) ShipDatabaseReadShipsByFactionMethod

func (fake *ShipDatabase) ReadShipsByFactionForCall(call int, fns ...ShipDatabaseReadShipsByFactionFunc) *ShipDatabase {
	fake.readShipsByFactionMutex.Lock()
	for _, fn := range fns {
		fakeMethod := fake.readShipsByFactionMethod[call]
		fake.readShipsByFactionMethod[call] = fn(fakeMethod)
	}
	fake.readShipsByFactionMutex.Unlock()
	return fake
}
func (fake *ShipDatabase) ReadShipByXWS(stringArg string) (shipResult models.Ship, errResult error) {
	fake.readShipByXWSMutex.Lock()
	fakeMethod := fake.readShipByXWSMethod[fake.readShipByXWSCalls]
	fakeMethod.StringArg = stringArg
	fake.readShipByXWSMethod[fake.readShipByXWSCalls] = fakeMethod
	fake.readShipByXWSCalls++
	fake.readShipByXWSMutex.Unlock()
	return fakeMethod.ShipResult, fakeMethod.ErrResult
}
func (fake *ShipDatabase) ReadShipByXWSReturns(shipResult models.Ship, errResult error) *ShipDatabase {
	fake.readShipByXWSMutex.Lock()
	fakeMethod := fake.readShipByXWSMethod[0]
	fakeMethod.ShipResult = shipResult
	fakeMethod.ErrResult = errResult
	fake.readShipByXWSMethod[0] = fakeMethod
	fake.readShipByXWSMutex.Unlock()
	return fake
}
func (fake *ShipDatabase) ReadShipByXWSGetArgs() (stringArg string) {
	fake.readShipByXWSMutex.RLock()
	stringArg = fake.readShipByXWSMethod[0].StringArg
	fake.readShipByXWSMutex.RUnlock()
	return stringArg
}

type ShipDatabaseReadShipByXWSFunc func(ShipDatabaseReadShipByXWSMethod) ShipDatabaseReadShipByXWSMethod

func (fake *ShipDatabase) ReadShipByXWSForCall(call int, fns ...ShipDatabaseReadShipByXWSFunc) *ShipDatabase {
	fake.readShipByXWSMutex.Lock()
	for _, fn := range fns {
		fakeMethod := fake.readShipByXWSMethod[call]
		fake.readShipByXWSMethod[call] = fn(fakeMethod)
	}
	fake.readShipByXWSMutex.Unlock()
	return fake
}
