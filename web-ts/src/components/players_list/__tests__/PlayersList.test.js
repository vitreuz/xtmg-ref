import React from 'react';
import { shallow } from 'enzyme';
import PlayersList from '../PlayersList';
import { PlayerSummary } from '../PlayersList';
import helpers from '../../../util/helpers';
import XWingFont from '../../xwing_font/index';

describe('PlayersList', () => {
  let players;
  let onNew = jest.fn();
  let onSelect = jest.fn();

  beforeEach(() => {
    players = [];

    onNew.mockReset();
    onSelect.mockReset();
  });

  describe('render', () => {
    describe('when no players are given', () => {
      beforeEach(() => {
        players = [];
      });

      it('renders an empty list with only the `New Player` button', () => {
        const wrapper = shallow(<PlayersList players={players} />);

        expect(wrapper).toMatchElement(
          <div>
            <ul>
              <li>
                <button>New Player</button>
              </li>
            </ul>
          </div>
        );
      });
    });

    describe('when given a list of players', () => {
      beforeEach(() => {
        players = [
          helpers.players.leeroyjenkins,
          helpers.players.lukeskywalker
        ];
      });

      it('renders the player summaries and the `New Player` button', () => {
        const wrapper = shallow(<PlayersList players={players} />);

        expect(wrapper).toMatchElement(
          <div>
            <ul>
              <li>
                <button>
                  <PlayerSummary />
                </button>
              </li>
              <li>
                <button>
                  <PlayerSummary />
                </button>
              </li>
              <li>
                <button>New Player</button>
              </li>
            </ul>
          </div>
        );
      });
    });
  });

  describe('New Player button', () => {
    describe('when attempting to create a new player', () => {
      it('calls the onNew function', () => {
        const wrapper = shallow(
          <PlayersList players={players} NewPlayer={onNew} />
        );

        const button = wrapper.find('.players-list-newplayer-button');
        button.simulate('click');
        expect(onNew.mock.calls.length).toBe(1);
      });
    });
  });

  describe('Player button', () => {
    describe('when selecting an existing player', () => {
      beforeEach(() => {
        players = [helpers.players.leeroyjenkins];
      });

      it('passes the player id to onSelect', () => {
        const wrapper = shallow(
          <PlayersList players={players} SelectPlayer={onSelect} />
        );

        const button = wrapper.find('.players-list-player-button');
        button.simulate('click');
        expect(onSelect.mock.calls.length).toBe(1);
      });
    });
  });
});

describe('PlayerSummary', () => {
  describe('when given a simple player', () => {
    it('renders the summary', () => {
      const wrapper = shallow(
        <PlayerSummary player={helpers.players.leeroyjenkins} />
      );

      expect(wrapper).toMatchElement(
        <div>
          <div>Leeroy Jenkins</div>
          <div>LEEEEEEroy</div>
          <div>5</div>
          <div>
            <XWingFont />
          </div>
          <div>
            <span>
              <XWingFont />
            </span>
            <span>
              <XWingFont />
            </span>
            <span>
              <XWingFont />
            </span>
            <span>
              <XWingFont />
            </span>
          </div>
        </div>
      );
    });
  });
});
