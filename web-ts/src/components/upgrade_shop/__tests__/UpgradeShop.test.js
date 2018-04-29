import { shallow } from 'enzyme';
import React from 'react';
import { UpgradeSlotType } from '../../../client/Upgrade';
import helpers from '../../../util/helpers';
import UpgradeItem from '../../upgrade_item';
import UpgradeShop from '../UpgradeShop';

describe('UpgradeShop', () => {
  let upgrades = [];
  let slot;
  let onPurchase = jest.fn();
  let onEquip = jest.fn();

  beforeEach(() => {
    const {
      ioncannonturret,
      integratedastromech,
      dorsalturret,
      blasterturret,
      engineUpgrade
    } = helpers.upgrades;
    upgrades = [
      ioncannonturret,
      integratedastromech,
      dorsalturret,
      blasterturret,
      engineUpgrade
    ];

    onPurchase.mockReset();
    onEquip.mockReset();
  });

  describe('render', () => {
    beforeEach(() => {
      slot = { slot: UpgradeSlotType.Turret };
    });

    describe('when slot is not specified', () => {
      it('renders each upgrade', () => {
        const wrapper = shallow(<UpgradeShop upgrades={upgrades} />);

        expect(wrapper).toMatchElement(
          <div>
            <ul>
              <li>
                <UpgradeItem />
              </li>
              <li>
                <UpgradeItem />
              </li>
              <li>
                <UpgradeItem />
              </li>
              <li>
                <UpgradeItem />
              </li>
              <li>
                <UpgradeItem />
              </li>
            </ul>
          </div>
        );
      });
    });

    describe('when a slot is specified', () => {
      it('renders', () => {
        const wrapper = shallow(
          <UpgradeShop upgrades={upgrades} upgradeSlot={slot} />
        );

        expect(wrapper).toMatchElement(
          <div>
            <ul>
              <li>
                <UpgradeItem />
              </li>
              <li>
                <UpgradeItem />
              </li>
              <li>
                <UpgradeItem />
              </li>
            </ul>
          </div>
        );
      });
    });
  });

  describe('UpgradeItem', () => {
    describe('when the player does not have enough xp', () => {
      it('passes a false `canClick` to the UpgradeItem', () => {
        const wrapper = shallow(
          <UpgradeShop upgrades={upgrades} current_xp={0} />
        );

        const item = wrapper.find(UpgradeItem).at(0);
        expect(item).toHaveProp('canClick', false);
      });
    });

    describe('when an empty slot is provided', () => {
      beforeEach(() => {
        slot = { slot: UpgradeSlotType.Turret };
        upgrades = [helpers.upgrades.blasterturret];
      });

      it('runs onEquip after running onPurchase', () => {
        const wrapper = shallow(
          <UpgradeShop
            upgrades={upgrades}
            upgradeSlot={slot}
            onEquip={onEquip}
            onPurchase={onPurchase}
          />
        );

        const item = wrapper.find(UpgradeItem);
        item.prop('onClick')();
        expect(onPurchase.mock.calls.length).toBe(1);
        expect(onEquip.mock.calls.length).toBe(1);
      });
    });

    describe('when an populated slot is provided', () => {
      beforeEach(() => {
        slot = {
          slot: UpgradeSlotType.Turret,
          upgrade: helpers.upgrades.dorsalturret
        };
        upgrades = [helpers.upgrades.blasterturret];
      });

      it('runs only onPurchase', () => {
        const wrapper = shallow(
          <UpgradeShop
            upgrades={upgrades}
            upgradeSlot={slot}
            onEquip={onEquip}
            onPurchase={onPurchase}
          />
        );

        const item = wrapper.find(UpgradeItem);
        item.prop('onClick')();
        expect(onPurchase.mock.calls.length).toBe(1);
        expect(onEquip.mock.calls.length).toBe(0);
      });
    });
  });
});
