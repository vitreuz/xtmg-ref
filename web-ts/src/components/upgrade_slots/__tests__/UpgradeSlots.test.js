import React from 'react';

import { shallow, mount } from 'enzyme';
import UpgradeSlots from '../UpgradeSlots';
import { Upgrades, UpgradeSlotType, Upgrade } from '../../../client/Upgrade';
import UpgradeBase from '../../upgrade_base';

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

const xwingUpgrades = [
  { slot: UpgradeSlotType.Torpedos },
  { slot: UpgradeSlotType.Astromech, upgrade: r2d2Upgrade },
  { slot: UpgradeSlotType.Modification, upgrade: stealthDeviceUpgrade },
  { slot: UpgradeSlotType.Title }
];

describe('UpgradeSlots', () => {
  let slots = [];

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
                <span>{/* TODO: ICON */}</span>
                <span>Torpedos</span>
              </button>
            </div>
            <div>
              <button>
                <span>{/* TODO: ICON */}</span>
                <UpgradeBase />
              </button>
            </div>
            <div>
              <button>
                <span>{/* TODO: ICON */}</span>
                <UpgradeBase />
              </button>
            </div>
            <div>
              <button>
                <span>{/* TODO: ICON */}</span>
                <span>Title</span>
              </button>
            </div>
          </div>
        </div>
      );
    });
  });
});
