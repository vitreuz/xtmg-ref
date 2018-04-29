import { shallow } from 'enzyme';
import React from 'react';
import helpers from '../../../util/helpers';
import PlayersList from '../../players_list/index';
import PlayerLobby from '../PlayerLobby';
import PlayerForm from '../../player_form';
import PlayerMenu from '../../player_menu/index';
import { wrap } from 'module';

describe('PlayerLobby', () => {
  let fetchPlayer = jest.fn(id => ({ id: id }));
  let listUpgrades = jest.fn(() => ['some-upgrade']);
  let createPlayer = jest.fn();

  let updatePlayerSlots = jest.fn();
  let updatePlayerHangarUpgrades = jest.fn();

  beforeEach(() => {
    createPlayer.mockClear();
    fetchPlayer.mockClear();
    listUpgrades.mockClear();
    updatePlayerSlots.mockClear();
    updatePlayerHangarUpgrades.mockClear();
  });

  describe('render', () => {
    describe('when no player is chosen and not creating a player', () => {
      it('renders a PlayersList', () => {
        const wrapper = shallow(<PlayerLobby />);
        wrapper.setState({ chosenPlayer: undefined });

        expect(wrapper).toMatchElement(
          <div>
            <PlayersList />
          </div>
        );
      });
    });

    describe('when no player is chosen and creating a player', () => {
      it('renders a PlayersForm', () => {
        const wrapper = shallow(<PlayerLobby />);
        wrapper.setState({ chosenPlayer: undefined, isCreateOpen: true });

        expect(wrapper).toMatchElement(
          <div>
            <PlayerForm />
          </div>
        );
      });
    });

    describe('when a player is locked in', () => {
      it('renders a PlayerMenu', () => {
        const wrapper = shallow(<PlayerLobby />);
        wrapper.setState({ chosenPlayer: helpers.players.leeroyjenkins });

        expect(wrapper).toMatchElement(
          <div>
            <PlayerMenu />
          </div>
        );
      });
    });
  });

  describe('state', () => {
    describe('onSelectPlayer', () => {
      describe('when onSelectPlayer is called', () => {
        it('should set the chosen player and their equipable upgrades', () => {
          const wrapper = shallow(
            <PlayerLobby
              FetchPlayer={fetchPlayer}
              ListUpgradesForPlayer={listUpgrades}
            />
          );
          wrapper.instance().onSelectPlayer('aabb');

          expect(fetchPlayer).toBeCalledWith('aabb');
          expect(listUpgrades).toBeCalledWith('aabb');

          expect(wrapper).toHaveState({
            chosenPlayer: { id: 'aabb' },
            upgrades: ['some-upgrade']
          });
        });
      });

      describe('when PlayersList calls SelectPlayer', () => {
        it('should set the chosen player', () => {
          const wrapper = shallow(
            <PlayerLobby
              FetchPlayer={fetchPlayer}
              ListUpgradesForPlayer={listUpgrades}
            />
          );
          const list = wrapper.find(PlayersList);
          list.props().SelectPlayer('aabb');

          expect(wrapper).toHaveState('chosenPlayer', { id: 'aabb' });
        });
      });
    });

    describe('onEquipUpgrade', () => {
      let slots;

      beforeEach(() => {
        slots = [{ id: 1 }];
        fetchPlayer.mockImplementation(id => ({ id: id, slots: slots }));
      });

      describe('when onEquipUpgrade is called', () => {
        it('should update the player and equipable upgrades', () => {
          const wrapper = shallow(
            <PlayerLobby
              ListUpgradesForPlayer={listUpgrades}
              FetchPlayer={fetchPlayer}
              UpdatePlayerSlots={updatePlayerSlots}
            />
          ).setState({
            chosenPlayer: { id: 'aabb' }
          });
          wrapper.instance().onEquipUpgrade(1);

          expect(updatePlayerSlots).toBeCalledWith('aabb', 1, 'add');
          expect(fetchPlayer).toBeCalledWith('aabb');
          expect(listUpgrades).toBeCalledWith('aabb');

          expect(wrapper).toHaveState({
            chosenPlayer: {
              id: 'aabb',
              slots: slots
            },
            upgrades: ['some-upgrade']
          });
        });
      });

      describe('when PlayerMenu calls EquipUpgrade', () => {
        it('should update the player', () => {
          const wrapper = shallow(
            <PlayerLobby
              ListUpgradesForPlayer={listUpgrades}
              FetchPlayer={fetchPlayer}
              UpdatePlayerSlots={updatePlayerSlots}
            />
          ).setState({
            chosenPlayer: { id: 'aabb' }
          });
          const menu = wrapper.find(PlayerMenu);
          menu.props().EquipUpgrade(1);

          expect(wrapper).toHaveState('chosenPlayer', {
            id: 'aabb',
            slots: slots
          });
        });
      });
    });

    describe('onPurchaseUpgrade', () => {
      let slots;

      beforeEach(() => {
        slots = [{ id: 1 }];
        fetchPlayer.mockImplementation(id => ({ id: id, slots: slots }));
      });

      describe('when onPurchaseUpgrade is called', () => {
        it('should update the player', () => {
          const wrapper = shallow(
            <PlayerLobby
              ListUpgradesForPlayer={listUpgrades}
              FetchPlayer={fetchPlayer}
              UpdatePlayerHangarUpgrades={updatePlayerHangarUpgrades}
            />
          ).setState({
            chosenPlayer: { id: 'aabb' }
          });
          wrapper.instance().onPurchaseUpgrade(1);

          expect(updatePlayerHangarUpgrades).toBeCalledWith('aabb', 1, 'add');
          expect(fetchPlayer).toBeCalledWith('aabb');
          expect(listUpgrades).toBeCalledWith('aabb');
          expect(wrapper).toHaveState({
            chosenPlayer: {
              id: 'aabb',
              slots: slots
            },
            upgrades: ['some-upgrade']
          });
        });
      });

      describe('when PlayerMenu calls PurchaseUpgrade', () => {
        it('should update the player', () => {
          const wrapper = shallow(
            <PlayerLobby
              ListUpgradesForPlayer={listUpgrades}
              FetchPlayer={fetchPlayer}
              UpdatePlayerHangarUpgrades={updatePlayerHangarUpgrades}
            />
          ).setState({
            chosenPlayer: { id: 'aabb' }
          });
          const menu = wrapper.find(PlayerMenu);
          menu.props().PurchaseUpgrade(1);

          expect(wrapper).toHaveState('chosenPlayer', {
            id: 'aabb',
            slots: slots
          });
        });
      });
    });

    describe('onUnequipUpgrade', () => {
      let slots;

      beforeEach(() => {
        slots = [{ id: 1 }];
        fetchPlayer.mockImplementation(id => ({ id: id, slots: slots }));
      });

      describe('when onUnequipUpgrade is called', () => {
        it('should update the player', () => {
          const wrapper = shallow(
            <PlayerLobby
              ListUpgradesForPlayer={listUpgrades}
              FetchPlayer={fetchPlayer}
              UpdatePlayerSlots={updatePlayerSlots}
            />
          ).setState({
            chosenPlayer: { id: 'aabb' }
          });
          wrapper.instance().onUnequipUpgrade(1);

          expect(updatePlayerSlots).toBeCalledWith('aabb', 1, 'remove');
          expect(fetchPlayer).toBeCalledWith('aabb');
          expect(listUpgrades).toBeCalledWith('aabb');
          expect(wrapper).toHaveState({
            chosenPlayer: {
              id: 'aabb',
              slots: slots
            },
            upgrades: ['some-upgrade']
          });
        });
      });

      describe('when PlayerMenu calls UnequipUpgrade', () => {
        it('should update the player', () => {
          const wrapper = shallow(
            <PlayerLobby
              ListUpgradesForPlayer={listUpgrades}
              FetchPlayer={fetchPlayer}
              UpdatePlayerSlots={updatePlayerSlots}
            />
          ).setState({
            chosenPlayer: { id: 'aabb' }
          });
          const menu = wrapper.find(PlayerMenu);
          menu.props().UnequipUpgrade(1);

          expect(wrapper).toHaveState('chosenPlayer', {
            id: 'aabb',
            slots: slots
          });
        });
      });
    });

    describe('onCreatePlayer', () => {
      describe('when onCreatePlayer is called', () => {
        it('sets calls CreatePlayer', () => {
          const wrapper = shallow(<PlayerLobby CreatePlayer={createPlayer} />);
          const id = wrapper.instance().onCreatePlayer({ a: 'b' });

          expect(createPlayer).toBeCalledWith({ a: 'b' });
        });
      });

      describe('when PlayerForm calls CreatePlayer', () => {
        it('sets calls CreatePlayer', () => {
          const wrapper = shallow(
            <PlayerLobby CreatePlayer={createPlayer} />
          ).setState({
            isCreateOpen: true
          });
          const form = wrapper.find(PlayerForm);
          form.props().CreatePlayer({ a: 'b' });

          expect(createPlayer).toBeCalledWith({ a: 'b' });
        });
      });
    });

    describe('onCancelCreate', () => {
      describe('when onCancelCreate is called', () => {
        it('sets isCreateOpen to false', () => {
          const wrapper = shallow(<PlayerLobby />).setState({
            isCreateOpen: true
          });
          wrapper.instance().onCancelCreate();

          expect(wrapper).toHaveState('isCreateOpen', false);
        });
      });

      describe('when PlayerForm calls onCancelCreate', () => {
        it('sets isCreateOpen to false', () => {
          const wrapper = shallow(<PlayerLobby />).setState({
            isCreateOpen: true
          });
          const form = wrapper.find(PlayerForm);
          form.props().CancelForm();

          expect(wrapper).toHaveState('isCreateOpen', false);
        });
      });
    });

    describe('onNewPlayer', () => {
      describe('when onNewPlayer is called', () => {
        it('sets isCreateOpen to true', () => {
          const wrapper = shallow(<PlayerLobby />);
          wrapper.instance().onNewPlayer();

          expect(wrapper).toHaveState('isCreateOpen', true);
        });
      });

      describe('when PlayerList calls NewPlayer', () => {
        it('sets isCreateOpen to true', () => {
          const wrapper = shallow(<PlayerLobby />);
          const list = wrapper.find(PlayersList);
          list.props().NewPlayer();

          expect(wrapper).toHaveState('isCreateOpen', true);
        });
      });
    });
  });
});
