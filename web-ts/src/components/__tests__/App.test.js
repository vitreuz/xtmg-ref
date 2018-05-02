import React from 'react';
import Client from '../../client';
import { shallow } from 'enzyme';
import App from '../App';
import PlayerLobby from '../player_lobby/PlayerLobby';
import fetchMock from 'fetch-mock';

describe('app', () => {
  afterEach(() => {
    fetchMock.restore();
    fetchMock.get('/v1/config', '{"data": {"config": "some-config"}}');
  });

  describe('render', () => {
    describe('when config and/or players are not set', () => {
      it('renders LOADING...', () => {
        const wrapper = shallow(<App client={Client} />);

        expect(wrapper).toMatchElement(
          <div>
            <div>LOADING...</div>
          </div>
        );
      });
    });

    describe('when config is set', () => {
      it('renders a player lobby', () => {
        const wrapper = shallow(<App client={Client} />).setState({
          config: {},
          players: []
        });

        expect(wrapper).toMatchElement(
          <div>
            <PlayerLobby />
          </div>
        );
      });
    });
  });

  describe('FetchConfig', () => {
    describe('when called', () => {
      it('returns the current config', async () => {
        const wrapper = shallow(<App client={Client} />);
        await wrapper.instance().FetchConfig();

        expect(wrapper).toHaveState('config', 'some-config');
      });
    });
  });

  describe('ListPlayers', () => {
    beforeEach(() => {
      fetchMock.get(
        `/v1/players`,
        JSON.stringify({ data: { players: ['some-player'] } })
      );
    });

    describe('when called', () => {
      it('returns the current set of players', async () => {
        const wrapper = shallow(<App client={Client} />);
        await wrapper.instance().ListPlayers();

        expect(wrapper).toHaveState('players', ['some-player']);
      });
    });
  });

  describe('PlayerLobby methods', () => {
    let plProps;
    beforeEach(() => {
      const wrapper = shallow(<App client={Client} />).setState({
        config: {},
        players: []
      });

      const playerLobby = wrapper.find(PlayerLobby);
      plProps = playerLobby.props();
    });

    describe('CreatePlayer', () => {
      beforeEach(() => {
        fetchMock.postOnce(
          '/v1/players',
          JSON.stringify({ data: { id: 'some-id' } })
        );
      });

      describe('when called by PlayerLobby', () => {
        it('it calls CreatePlayer with the correct JSON', async () => {
          const req = { name: 'aabb', callsign: 'ccdd', ship_xws: 'eeff' };
          await plProps.CreatePlayer(req);

          const call = fetchMock.lastCall('/v1/players', 'POST');
          expect(call[1].body).toBe(JSON.stringify(req));
        });
      });
    });

    describe('FetchPlayer', () => {
      beforeEach(() => {
        fetchMock.getOnce(
          '/v1/players/aabb',
          JSON.stringify({ data: { player: 'some-player' } })
        );
      });

      describe('when called by PlayerLobby', () => {
        it('it calls CreatePlayer with the correct JSON', async () => {
          const player = await plProps.FetchPlayer('aabb');

          const call = fetchMock.lastCall('/v1/players/aabb', 'GET');
          expect(call.length).toBeGreaterThan(0);
          expect(player).toBe('some-player');
        });
      });
    });

    describe('UpdatePlayerSlots', () => {
      beforeEach(() => {
        fetchMock.putOnce('/v1/players/aabb', { status: 204 });
      });

      describe('when called by PlayerLobby', () => {
        it('it calls UpdatePlayerHangar with the correct JSON', async () => {
          await plProps.UpdatePlayerSlots('aabb', 2, 'add');

          const call = fetchMock.lastCall(`/v1/players/aabb`, 'PUT');
          expect(call).toBeTruthy();
          expect(call[1].body).toBe(JSON.stringify({ slots: [{ add: 2 }] }));
        });
      });
    });

    describe('UpdatePlayerHangarSlots', () => {
      beforeEach(() => {
        fetchMock.putOnce('/v1/players/aabb/hangar', { status: 204 });
      });

      describe('when called by PlayerLobby', () => {
        it('it calls UpdatePlayerHangar with the correct JSON', async () => {
          await plProps.UpdatePlayerHangarUpgrades('aabb', 2, 'add');

          const call = fetchMock.lastCall(`/v1/players/aabb/hangar`, 'PUT');
          expect(call).toBeTruthy();
          expect(call[1].body).toBe(JSON.stringify({ slots: [{ add: 2 }] }));
        });
      });
    });

    describe('ListUpgradesByPlayer', () => {
      beforeEach(() => {
        fetchMock.getOnce(
          '/v1/upgrades?player_id=aabb&owned=true',
          JSON.stringify({
            data: { upgrades: ['some-upgrade'] }
          })
        );
      });

      describe('when called by ListUpgradesByPlayer', () => {
        it('it calls ListUpgrades with query params', async () => {
          const wrapper = shallow(<App client={Client} />).setState({
            config: {},
            players: []
          });

          const playerLobby = wrapper.find(PlayerLobby);
          const upgrades = await playerLobby
            .props()
            .ListUpgradesByPlayer('aabb');

          expect(
            fetchMock.called('/v1/upgrades?player_id=aabb&owned=true')
          ).toBe(true);
          expect(upgrades).toEqual(['some-upgrade']);
        });
      });
    });
  });
});
