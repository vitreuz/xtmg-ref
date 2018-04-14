import { shallow } from 'enzyme';
import * as React from 'react';
import { Player } from '../../../client/Player';
import helpers from '../../../util/helpers';
import ActionBar from '../../action_bar';
import ManeuverCard from '../../maneuver_card';
import StatusBar from '../../status_bar';
import UpgradesCard from '../../upgrades_card';
import PlayerCard from '../PlayerCard';

describe('PlayerCard', () => {
  let player: Player;
  describe('render', () => {
    describe('when given a simple level 2 player', () => {
      beforeEach(() => {
        player = {
          name: 'Leeroy Jenkins',
          callsign: 'LEEEEEERoy',
          pilot_skill: 2,
          current_xp: 5,

          ship: helpers.ships.xwing,
          slots: [],

          hangar: {
            ships: [helpers.ships.xwing],
            upgrades: []
          }
        };
      });

      it('renders the player card', () => {
        const wrapper = shallow(<PlayerCard player={player} />);

        expect(wrapper).toMatchElement(
          <div>
            <div>Leeroy Jenkins</div>
            <div>LEEEEEERoy</div>
            <div>2</div>
            <div>
              <StatusBar />
            </div>
            <div>
              <ActionBar />
            </div>
            <div>
              <ManeuverCard />
            </div>
            <div>
              <UpgradesCard />
            </div>
          </div>
        );
      });
    });
  });
});
