import React from 'react';

import { shallow, mount } from 'enzyme';
import UpgradeItem from '../UpgradeItem';

import UpgradeBase from '../../upgrade_base';

const turretUpgrade = {
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
};

const intimidationUpgrade = {
  name: 'Intimidation',
  id: 103,
  slot: 'Elite',
  points: 2,
  text:
    "While you are touching an enemy ship, reduce that ship's agility value by 1.",
  image: 'upgrades/Elite/intimidation.png',
  xws: 'intimidation'
};

describe('UpgradeItem', () => {
  let upgrade = {};
  let current_xp = 0;
  let buttonText = '';
  let canClick = false;
  const onPurchase = jest.fn();

  describe('render', () => {
    describe('when given an offense upgrade', () => {
      beforeEach(() => {
        upgrade = turretUpgrade;
        buttonText = 'Purchase';
      });

      it('renders the upgrade and the purchase button', () => {
        const wrapper = shallow(
          <UpgradeItem upgrade={upgrade} buttonText={buttonText} />
        );

        expect(wrapper).toMatchElement(
          <div>
            <UpgradeBase />
            <div>
              <span>5</span>
            </div>
            <button>Purchase</button>
          </div>
        );
      });
    });

    describe('when given a non-offense upgrade', () => {
      beforeEach(() => {
        upgrade = intimidationUpgrade;
        buttonText = 'Equip';
      });

      it('renders the upgrade and the purchase button', () => {
        const wrapper = shallow(
          <UpgradeItem upgrade={upgrade} buttonText={buttonText} />
        );

        expect(wrapper).toMatchElement(
          <div>
            <UpgradeBase />
            <div>
              <span>2</span>
            </div>
            <button>Equip</button>
          </div>
        );
      });
    });
  });

  describe('purchase button', () => {
    describe('when canClick returns true', () => {
      beforeEach(() => {
        upgrade = { id: 42, points: 3 };
        canClick = true;
      });

      it('enables the purchase button', () => {
        const wrapper = shallow(
          <UpgradeItem upgrade={upgrade} canClick={canClick} />
        );

        const button = wrapper.find('button');
        expect(button).toHaveProp('disabled', false);
      });

      describe('when the button is pressed', () => {
        it('issues a callback using the upgrade id', () => {
          const wrapper = shallow(
            <UpgradeItem
              upgrade={upgrade}
              canClick={canClick}
              onClick={onPurchase}
            />
          );

          const button = wrapper.find('button');
          button.simulate('click');
          expect(onPurchase).toHaveBeenCalledWith(42);
        });
      });
    });

    describe("when a player doesn't have enought xp to purchase an upgrade", () => {
      beforeEach(() => {
        upgrade = { points: 5 };
        canClick = false;
      });

      it('disables the purchase button', () => {
        const wrapper = shallow(
          <UpgradeItem upgrade={upgrade} canClick={canClick} />
        );

        const button = wrapper.find('button');
        expect(button).toHaveProp('disabled', true);
      });
    });
  });
});
