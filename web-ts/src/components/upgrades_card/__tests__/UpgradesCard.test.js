import { shallow, render } from 'enzyme';
import React from 'react';
import helpers from '../../../util/helpers';
import UpgradeCard from '../UpgradesCard';
import UpgradeSlots from '../../upgrade_slots/index';

describe('UpgradesCard', () => {
  let slots;
  describe('render', () => {
    describe('when given a basic set of player slots', () => {
      beforeEach(() => {
        slots = helpers.players.leeroyjenkins.slots;
      });
      it('shows the upgrade slots', () => {
        const wrapper = shallow(<UpgradeCard slots={slots} />);

        expect(wrapper).toMatchElement(
          <div>
            <div>
              <UpgradeSlots />
            </div>
          </div>
        );
      });
    });
  });
});
