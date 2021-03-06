import { shallow } from 'enzyme';
import * as React from 'react';
import helpers from '../../../util/helpers';
import ActionBar from '../../action_bar';
import ManeuverCard from '../../maneuver_card';
import StatusBar from '../../status_bar';
import UpgradeSlots from '../../upgrade_slots/index';
import PlayerCard from '../PlayerCard';

describe('PlayerCard', () => {
  let player;
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
            <div>5</div>
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
              <UpgradeSlots />
            </div>
          </div>
        );
      });
    });
  });
});
