import Client from '../index';
import { get } from '../Client';
import { UpgradeSlotType } from '../Upgrade';
import fetchMock from 'fetch-mock';

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
