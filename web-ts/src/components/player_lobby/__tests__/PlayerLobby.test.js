import { shallow } from 'enzyme';
import React from 'react';
import helpers from '../../../util/helpers';
import PlayersList from '../../players_list/index';
import PlayerLobby from '../PlayerLobby';
import PlayerForm from '../../player_form';
import PlayerMenu from '../../player_menu/index';

describe('PlayerLobby', () => {
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

    describe('when no player is chosen and not creating a player', () => {
      it('renders a PlayersList', () => {
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
      const wrapper = shallow(<PlayerLobby />);
      wrapper.setState({ chosenPlayer: helpers.players.leeroyjenkins });

      expect(wrapper).toMatchElement(
        <div>
          <PlayerMenu />
        </div>
      );
    });
  });

  describe('startNewPlayer', () => {});
  describe('onNewPlayerCreate', () => {});
  describe('onChoosePlayer', () => {});
  describe('onUnchoosePlayer', () => {});
});
