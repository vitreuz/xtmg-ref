import React from 'react';

import { shallow, mount } from 'enzyme';
import UpgradeSlot from '../UpgradeSlot';

import { UpgradeSlotType } from '../../../client/Upgrade';
import { UpgradeItem } from '../../upgrade_shop/UpgradeItem';

const astromechSlot = UpgradeSlotType.Astromech;

describe('UpgradeSlot', () => {
  let type = 0;
  let isEmpty = false;

  describe('render', () => {
    describe('when the slot is empty', () => {
      beforeEach(() => {
        type = astromechSlot;
        isEmpty = true;
      });

      it('the upgrade slot only has the icon and slot name displayed', () => {
        const wrapper = shallow(<UpgradeSlot type={type} />);

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
        type = astromechSlot;
        isEmpty = false;
      });

      it('displays the upgrade icon and the upgrade item', () => {
        const wrapper = shallow(<UpgradeSlot type={type} />);

        expect(wrapper).toMatchElement(
          <div>
            <button>
              <span>{/*TODO: icon*/}</span>
              <UpgradeItem />
            </button>
          </div>
        );
      });
    });
  });
});
