import React from 'react';
import { shallow } from 'enzyme';
import PlayersList from '../PlayersList';
import { PlayerSummary } from '../PlayersList';
import helpers from '../../../util/helpers';
import XWingFont from '../../xwing_font/index';

describe('PlayersList', () => {
  let players;

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
