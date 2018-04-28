import { shallow } from 'enzyme';
import React from 'react';
import { UpgradeSlotType } from '../../../client/Upgrade';
import helpers from '../../../util/helpers';
import UpgradeBase from '../../upgrade_base';
import XWingFont from '../../xwing_font/index';
import UpgradeSlots from '../UpgradeSlots';

const xwingUpgrades = [
  { slot: UpgradeSlotType.Torpedo },
  { slot: UpgradeSlotType.Astromech, upgrade: helpers.upgrades.r2d2 },
  {
    slot: UpgradeSlotType.Modification,
    upgrade: helpers.upgrades.stealthdevice
  },
  { slot: UpgradeSlotType.Title }
];

describe('UpgradeSlots', () => {
  let slots = [];
  let onClick = jest.fn();

  beforeEach(() => {
    onClick.mockReset();
  });

  describe('render', () => {
    describe('when no slot-types are provided', () => {
      beforeEach(() => {
        slots = [];
      });

      it('renders empty', () => {
        const wrapper = shallow(<UpgradeSlots slots={slots} />);

        expect(wrapper).toMatchElement(
          <div>
            <div />
          </div>
        );
      });
    });

    describe('when several slots are passed, some with upgrades', () => {
      beforeEach(() => {
        slots = xwingUpgrades;
      });

      it('renders some slots with upgrades, and others empty', () => {
        const wrapper = shallow(<UpgradeSlots slots={slots} />);

        expect(wrapper).toMatchElement(
          <div>
            <div>
              <div>
                <button>
                  <div>
                    <XWingFont />
                  </div>
                  <div>Torpedo</div>
                </button>
              </div>
              <div>
                <button>
                  <div>
                    <XWingFont />
                  </div>
                  <UpgradeBase />
                </button>
              </div>
              <div>
                <button>
                  <div>
                    <XWingFont />
                  </div>
                  <UpgradeBase />
                </button>
              </div>
              <div>
                <button>
                  <div>
                    <XWingFont />
                  </div>
                  <div>Title</div>
                </button>
              </div>
            </div>
          </div>
        );
      });
    });
  });

  describe('button', () => {
    describe('when a button is pressed', () => {
      beforeEach(() => {
        slots = xwingUpgrades;
      });
      it('passes the UpgradeSlot to the callback', () => {
        const wrapper = shallow(
          <UpgradeSlots slots={slots} onSelect={onClick} />
        );

        const button = wrapper.find('button').at(0);
        button.simulate('click');
        expect(onClick.mock.calls.length).toBe(1);
      });
    });
  });
});
