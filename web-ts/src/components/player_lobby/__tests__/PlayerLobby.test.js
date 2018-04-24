import { shallow } from 'enzyme';
import React from 'react';
import helpers from '../../../util/helpers';
import PlayerCard from '../../player_card/index';
import PlayersList from '../../players_list/index';
import PlayerLobby from '../PlayerLobby';

describe('PlayerLobby', () => {
  describe('render', () => {
    describe('when no player is chosen', () => {
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

    describe('when a player is locked in', () => {
      const wrapper = shallow(<PlayerLobby />);
      wrapper.setState({ chosenPlayer: helpers.players.leeroyjenkins });

      expect(wrapper).toMatchElement(
        <div>
          <PlayerCard />
        </div>
      );
    });
  });

  describe('startNewPlayer', () => {});
  describe('onNewPlayerCreate', () => {});
  describe('onChoosePlayer', () => {});
  describe('onUnchoosePlayer', () => {});
});
