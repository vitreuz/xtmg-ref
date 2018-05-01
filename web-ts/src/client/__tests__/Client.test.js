import Client from '../index';
import { get, post, put } from '../Client';
import { UpgradeSlotType } from '../Upgrade';
import fetchMock from 'fetch-mock';
import helpers from '../../util/helpers';

describe('get', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  describe('when fetch returns a bad response', () => {
    beforeEach(() => {
      fetchMock.getOnce('some-url', {
        status: 400
      });
    });

    it('raises an error', async () => {
      expect.assertions(1);

      return get('some-url').catch(e =>
        expect(e).toEqual(Error('Bad Request'))
      );
    });
  });

  describe('when no values are returned from fetch', () => {
    beforeEach(() => {
      fetchMock.getOnce('some-url', {});
    });

    it('returns an okay with nothing in the data', async () => {
      expect.assertions(1);

      return get('some-url').then(resp => {
        expect(resp).toEqual({});
      });
    });
  });
});

describe('post', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  describe('when fetch returns a bad response', () => {
    beforeEach(() => {
      fetchMock.postOnce('some-url', {
        status: 400
      });
    });

    it('raises an error', async () => {
      expect.assertions(1);

      return post('some-url').catch(e =>
        expect(e).toEqual(Error('Bad Request'))
      );
    });
  });

  describe('when no values are returned from fetch', () => {
    beforeEach(() => {
      fetchMock.postOnce('some-url', {});
    });

    it('returns an okay with nothing in the data', async () => {
      expect.assertions(1);

      return post('some-url').then(resp => {
        expect(resp).toEqual({});
      });
    });
  });
});

describe('put', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  describe('when fetch returns a bad response', () => {
    beforeEach(() => {
      fetchMock.putOnce('some-url', {
        status: 400
      });
    });

    it('raises an error', async () => {
      expect.assertions(1);

      return put('some-url').catch(e =>
        expect(e).toEqual(Error('Bad Request'))
      );
    });
  });

  describe('when no values are returned from fetch', () => {
    beforeEach(() => {
      fetchMock.putOnce('some-url', {});
    });

    it('returns an okay with nothing in the data', async () => {
      expect.assertions(1);

      return put('some-url').then(resp => {
        expect(resp).toEqual(undefined);
      });
    });
  });
});

describe('CreatePlayer', () => {
  let player;

  beforeEach(() => {
    player = { name: 'a', callsign: 'b', ship_xws: 'c' };

    fetchMock.postOnce('/v1/players', '{"data": {"id": "abc"}}');
  });

  it('returns a simple player json', async () => {
    expect.assertions(3);

    return Client.CreatePlayer(player).then(id => {
      expect(fetchMock.called()).toBe(true);
      expect(fetchMock.lastCall()[1].body).toBe(JSON.stringify(player));

      expect(id).toEqual('abc');
    });
  });
});

describe('ListPlayers', () => {
  let players;
  beforeEach(() => {
    players = `{"data": {
      "players": [
      {"name": "Leeroy Jenkins", "slots": ["Salvaged Astromech"]}
    ]
  } }`;

    fetchMock.getOnce('/v1/players', players);
  });

  it('returns a simple player json', async () => {
    expect.assertions(1);

    return Client.ListPlayers().then(players => {
      expect(players).toEqual([
        { name: 'Leeroy Jenkins', slots: [UpgradeSlotType.SalvagedAstromech] }
      ]);
    });
  });
});

describe('FetchPlayer', () => {
  let player;

  beforeEach(() => {
    const ship = JSON.stringify(helpers.ships.tiefighter);
    player = `{"data": {
      "player": {
        "id": "eeefff",
        "name": "Jack",
        "callsign": "JJ",
        "pilot_skill": 4,
        "current_xp": 3,

        "ship":{
          "name": "TIE Fighter",
          "faction": ["Galactic Empire","Rebel Alliance"],
          "status": {
            "attack":2,"agility":3,"hull":3,"shield":0
          },
          "actions": [
            "Focus", "Barrel Roll", "Evade"
          ],
          "maneuvers": [
            [0,0,0,0,0,0],
            [1,0,0,0,1,0],
            [1,2,2,2,1,0],
            [1,1,2,1,1,3],
            [0,0,1,0,0,3],
            [0,0,1,0,0,0]
          ],
          "size": "small",
          "xws": "tiefighter",
          "id": 4,
          "firing_arcs": ["Front"]
        },

        "slots": [
          { "slot": "Astromech" },
          { "slot": "Bomb" },
          { "slot": "Cannon" },
          { "slot": "Cargo" },
          { "slot": "Crew" },
          { "slot": "Elite" },
          { "slot": "Hardpoint" },
          { "slot": "Illicit" },
          { "slot": "Missile" },
          { "slot": "Salvaged Astromech" },
          { "slot": "System" },
          { "slot": "Team" },
          { "slot": "Tech" },
          { "slot": "Title" },
          { "slot": "Torpedo" },
          { "slot": "Turret" }
        ],


        "hangar": {
          "ships": [${ship}],
          "upgrades": []
        }
      }
    }
  }`;

    fetchMock.getOnce('/v1/players/eeefff', player);
  });

  it('returns a single player json', async () => {
    expect.assertions(1);

    return Client.FetchPlayer('eeefff').then(player => {
      expect(player).toEqual(helpers.players.everymanjack);
    });
  });
});

describe('UpdatePlayer', () => {
  let slotBody;

  beforeEach(() => {
    slotBody = { slots: [{ add: 1 }, { rem: 2 }] };

    fetchMock.putOnce('/v1/players/aabb', { status: 204 });
  });

  it('returns a simple player json', async () => {
    expect.assertions(2);

    return Client.UpdatePlayer('aabb', slotBody).then(players => {
      expect(fetchMock.called()).toBe(true);
      expect(fetchMock.lastCall()[1].body).toBe(JSON.stringify(slotBody));
    });
  });
});

describe('UpdatePlayerHangar', () => {
  let slotBody;

  beforeEach(() => {
    slotBody = { slots: [{ add: 1 }, { rem: 2 }] };

    fetchMock.putOnce('/v1/players/aabb/hangar', { status: 204 });
  });

  it('returns a simple player json', async () => {
    expect.assertions(2);

    return Client.UpdatePlayerHangar('aabb', slotBody).then(players => {
      expect(fetchMock.called()).toBe(true);
      expect(fetchMock.lastCall()[1].body).toBe(JSON.stringify(slotBody));
    });
  });
});

describe('ListUpgrades', () => {
  let upgrades;
  let params;

  describe('with simple upgrades', () => {
    beforeEach(() => {
      upgrades = `{"data": {
    "upgrades": [
      {
        "name": "R2-D2",
        "id": 3,
        "unique": true,
        "slot": "Astromech",
        "points": 4,
        "text": "After executing a green maneuver, you may recover 1 shield (up to your shield value).",
        "image": "upgrades/Astromech/r2-d2.png",
        "xws": "r2d2"
      },
      {
        "name": "R2-F2",
        "id": 4,
        "unique": true,
        "slot": "Astromech",
        "points": 3,
        "text": "<strong>Action:</strong> Increase your agility value by 1 until the end of this game round.",
        "image": "upgrades/Astromech/r2-f2.png",
        "xws": "r2f2"
      }
    ]
  }}`;
    });

    describe('without query params', () => {
      beforeEach(() => {
        fetchMock.getOnce('/v1/upgrades', upgrades);
      });

      it('returns the upgrades', () => {
        expect.assertions(1);

        return Client.ListUpgrades().then(upgrades => {
          expect(upgrades).toEqual([
            helpers.upgrades.r2d2,
            helpers.upgrades.r2f2
          ]);
        });
      });
    });

    describe('with query params', () => {
      beforeEach(() => {
        fetchMock.getOnce('/v1/upgrades?player_id=aabb&owned=true', upgrades);
      });

      it('returns the upgrades', () => {
        expect.assertions(1);

        return Client.ListUpgrades({ player_id: 'aabb', owned: true }).then(
          upgrades => {
            expect(upgrades).toEqual([
              helpers.upgrades.r2d2,
              helpers.upgrades.r2f2
            ]);
          }
        );
      });
    });
  });
});
