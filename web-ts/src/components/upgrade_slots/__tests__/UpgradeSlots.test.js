import React from 'react';

import { shallow, mount } from 'enzyme';
import UpgradeSlots from '../UpgradeSlots';
import { Upgrades, UpgradeSlotType, Upgrade } from '../../../client/Upgrade';
import UpgradeSlot from '../UpgradeSlot';

const xwingSlots = [
  UpgradeSlotType.Topredos,
  UpgradeSlotType.Astromech,
  UpgradeSlotType.Modification,
  UpgradeSlotType.Title
];
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

const stealthDeviceUpgrade = {
  name: 'Stealth Device',
  id: 174,
  points: 3,
  slot: 'Modification',
  text:
    'Increase your agility value by 1. If you are hit by an attack, discard this card.',
  image: 'upgrades/Modification/stealth-device.png',
  xws: 'stealthdevice',
  grants: [
    {
      type: 'stats',
      name: 'agility',
      value: 1
    }
  ]
};
const xwingUpgrades = [{}, r2d2Upgrade, stealthDeviceUpgrade];

describe('UpgradeSlots', () => {
  let slots = [];
  let upgrades = [{}];

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

  describe('when several slots are provided without upgrade', () => {
    beforeEach(() => {
      slots = xwingSlots;
      upgrades = [{}];
    });

    it('renders empty slots', () => {
      const wrapper = shallow(
        <UpgradeSlots slots={slots} upgrades={upgrades} />
      );

      expect(wrapper).toMatchElement(
        <div>
          <div>
            <UpgradeSlot />
            <UpgradeSlot />
            <UpgradeSlot />
            <UpgradeSlot />
          </div>
        </div>
      );
    });
  });

  describe('when several slots are passed, some with upgrades', () => {
    beforeEach(() => {
      slots = xwingSlots;
      upgrades = xwingUpgrades;
    });

    it('renders some slots with upgrades, and others empty', () => {
      const wrapper = shallow(
        <UpgradeSlots slots={slots} upgrades={upgrades} />
      );

      expect(wrapper).toMatchElement(
        <div>
          <div>
            <UpgradeSlot slot={UpgradeSlotType.Topredos} />
            <UpgradeSlot
              slot={UpgradeSlotType.Astromech}
              upgrade={r2d2Upgrade}
            />
            <UpgradeSlot
              slot={UpgradeSlotType.Modification}
              upgrade={stealthDeviceUpgrade}
            />
            <UpgradeSlot slot={UpgradeSlotType.Title} />
          </div>
        </div>
        // { ignoreProps: false }
        // should start workingin https://github.com/FormidableLabs/enzyme-matchers/issues/186
      );
    });
  });
});
