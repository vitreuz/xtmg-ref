import React from 'react';
import { shallow } from 'enzyme';

import UpgradeShop from '../UpgradeShop';
import UpgradeItem from '../UpgradeItem';

const turretUpgrades = [
  {
    name: 'Ion Cannon Turret',
    id: 0,
    slot: 'Turret',
    points: 5,
    attack: 4,
    range: '1-2',
    text:
      '<strong>Attack:</strong> Attack 1 ship (even a ship outside your firing arc).<br /><br />If this attack hits the target ship, the ship suffers 1 damage and receives 1 ion token.  Then cancel <strong>all</strong> dice results.',
    image: 'upgrades/Turret/ion-cannon-turret.png',
    xws: 'ioncannonturret'
  },
  {
    name: 'Blaster Turret',
    id: 37,
    slot: 'Turret',
    points: 4,
    attack: 3,
    range: '1-2',
    text:
      '<strong>Attack (focus):</strong> Spend 1 focus token to perform this attack against 1 ship (even a ship outside your firing arc).',
    image: 'upgrades/Turret/blaster-turret.png',
    xws: 'blasterturrettoMatchElement'
  },
  {
    image: 'upgrades/Turret/dorsal-turret.png',
    text:
      '<strong>Attack:</strong> Attack 1 ship (even a ship outside your firing arc).<br /><br />If the target of this attack is at Range 1, roll 1 additional attack die.',
    name: 'Dorsal Turret',
    points: 3,
    slot: 'Turret',
    attack: 2,
    range: '1-2',
    id: 212,
    xws: 'dorsalturret'
  }
];

describe('UpgradeShop', () => {
  let upgrades = [];
  describe('given no upgrades', () => {
    beforeEach(() => {
      upgrades = [];
    });

    it('renders only the cancel button', () => {
      const wrapper = shallow(<UpgradeShop />);

      expect(wrapper).toMatchElement(
        <div>
          <button>Cancel</button>
          <ul />
        </div>
      );
    });
  });

  describe('given a list of Upgrades', () => {
    beforeEach(() => {
      upgrades = turretUpgrades;
    });

    it('renders each upgrade', () => {
      const wrapper = shallow(<UpgradeShop upgrades={upgrades} />);

      expect(wrapper).toMatchElement(
        <div>
          <button>Cancel</button>
          <ul>
            <UpgradeItem />
            <UpgradeItem />
            <UpgradeItem />
          </ul>
        </div>
      );
    });
  });
});
