import React from 'react';

import { shallow, mount } from 'enzyme';
import UpgradeSlot from '../UpgradeSlot';

import { UpgradeSlotType } from '../../../client/Upgrade';

import UpgradeBase from '../../upgrade_base';

const astromechSlot = UpgradeSlotType.Astromech;
const r2d2Upgrade = {
  name: 'R2-D2',
  id: 3,
  unique: true,
  slot: 'Astromech',
  points: 4,
  text:
    'After executing a green maneuver, you may recover 1 shield (up to your shield value).',
  image: 'upgrades/Astromech/r2-d2.png',
  xws: 'r2d2'
};

describe('UpgradeSlot', () => {
  let slot = 0;
  let upgrade = {};

  describe('render', () => {
    describe('when the slot is empty', () => {
      beforeEach(() => {
        slot = astromechSlot;
      });

      it('the upgrade slot only has the icon and slot name displayed', () => {
        const wrapper = shallow(<UpgradeSlot slot={slot} />);

        expect(wrapper).toMatchElement(
          <div>
            <button>
              <span>{/*TODO: icon*/}</span>
              <span>Astromech</span>
            </button>
          </div>
        );
      });
    });

    describe('when the slot is not empty', () => {
      beforeEach(() => {
        slot = astromechSlot;
        upgrade = r2d2Upgrade;
      });

      it('displays the upgrade icon and the upgrade item', () => {
        const wrapper = shallow(<UpgradeSlot slot={slot} upgrade={upgrade} />);

        expect(wrapper).toMatchElement(
          <div>
            <button>
              <span>{/*TODO: icon*/}</span>
              <UpgradeBase />
            </button>
          </div>
        );
      });
    });
  });
});
