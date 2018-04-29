import * as React from 'react';
import { shallow } from 'enzyme';
import UpgradeInventory from '../../upgrade_inventory';
import { Upgrade, UpgradeSlotType } from '../../../client/Upgrade';
import helpers from '../../../util/helpers';
import UpgradeItem from '../../upgrade_item';

describe('UpgradeInventory', () => {
  let upgrades = [];
  let slot;
  let equip = jest.fn();
  let unequip = jest.fn();

  beforeEach(() => {
    upgrades = [
      helpers.upgrades.blasterturret,
      helpers.upgrades.dorsalturret,
      helpers.upgrades.engineUpgrade,
      helpers.upgrades.heavyscykinterceptor,
      helpers.upgrades.integratedastromech
    ];

    equip.mockReset();
    unequip.mockReset();
  });

  describe('render', () => {
    describe('when given an empty upgrade slot', () => {
      beforeEach(() => {
        slot = { slot: UpgradeSlotType.Turret };
      });
      it('renders all of the upgrades with the provided slot type', () => {
        const wrapper = shallow(
          <UpgradeInventory upgradeSlot={slot} upgrades={upgrades} />
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
            </ul>
          </div>
        );
      });
    });

    describe('when given an populated upgrade slot', () => {
      beforeEach(() => {
        slot = {
          slot: UpgradeSlotType.Turret,
          upgrade: helpers.upgrades.blasterturret
        };
      });
      it('renders provided upgrade separately', () => {
        const wrapper = shallow(
          <UpgradeInventory upgradeSlot={slot} upgrades={upgrades} />
        );

        expect(wrapper).toMatchElement(
          <div>
            <div>
              <UpgradeItem />
            </div>
            <ul>
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
    describe('when provided an empty UpgradeSlot', () => {
      beforeEach(() => {
        slot = { slot: UpgradeSlotType.Turret };
      });

      it('always passes true to the UpgradeItem', () => {
        const wrapper = shallow(
          <UpgradeInventory upgradeSlot={slot} upgrades={upgrades} />
        );

        const items = wrapper.find(UpgradeItem);
        items.forEach(item => expect(item).toHaveProp('canClick', true));
      });

      it('calls only onEquip', () => {
        const wrapper = shallow(
          <UpgradeInventory
            upgradeSlot={slot}
            upgrades={upgrades}
            onUnequip={unequip}
            onEquip={equip}
          />
        );

        const items = wrapper.find(UpgradeItem);
        items.forEach(item => {
          item.prop('onClick')();
          expect(equip.mock.calls.length).toBe(1);
          expect(unequip.mock.calls.length).toBe(0);

          equip.mockReset();
        });
      });
    });

    describe('when provided an non-empty UpgradeSlot', () => {
      beforeEach(() => {
        slot = {
          slot: UpgradeSlotType.Turret,
          upgrade: helpers.upgrades.blasterturret
        };
      });

      it('passes Unequip as the text to the upgrade item', () => {
        const wrapper = shallow(
          <UpgradeInventory upgradeSlot={slot} upgrades={upgrades} />
        );

        const item = wrapper.find(UpgradeItem).at(0);
        expect(item).toHaveProp('buttonText', 'Unequip');
      });

      it('passes the unequip func to the equipped item', () => {
        const wrapper = shallow(
          <UpgradeInventory
            upgradeSlot={slot}
            upgrades={upgrades}
            onUnequip={unequip}
            onEquip={equip}
          />
        );

        const equipped = wrapper.find(UpgradeItem).at(0);
        equipped.prop('onClick')();
        expect(equip.mock.calls.length).toBe(0);
        expect(unequip.mock.calls.length).toBe(1);
      });

      it('passes unequip on the equiped item to the unequipped items', () => {
        const wrapper = shallow(
          <UpgradeInventory
            upgradeSlot={slot}
            upgrades={upgrades}
            onUnequip={unequip}
            onEquip={equip}
          />
        );

        const equipped = wrapper.find(UpgradeItem).at(1);
        equipped.prop('onClick')();
        expect(equip.mock.calls.length).toBe(1);
        expect(unequip.mock.calls.length).toBe(1);
        expect(unequip.mock.calls[0][0]).toBe(
          helpers.upgrades.blasterturret.id
        );
      });
    });
  });
});
