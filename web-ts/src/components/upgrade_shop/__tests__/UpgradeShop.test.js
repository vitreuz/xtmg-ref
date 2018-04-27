import { shallow } from 'enzyme';
import React from 'react';
import { UpgradeSlotType } from '../../../client/Upgrade';
import helpers from '../../../util/helpers';
import UpgradeItem from '../../upgrade_item';
import UpgradeShop from '../UpgradeShop';

describe('UpgradeShop', () => {
  let upgrades = [];
  let slot;
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
    slot = UpgradeSlotType.Turret;
  });

  describe('render', () => {
    describe('when slot is not specified', () => {
      it('renders each upgrade', () => {
        const wrapper = shallow(<UpgradeShop upgrades={upgrades} />);

        expect(wrapper).toMatchElement(
          <div>
            <ul>
              <UpgradeItem />
              <UpgradeItem />
              <UpgradeItem />
              <UpgradeItem />
              <UpgradeItem />
            </ul>
          </div>
        );
      });
    });

    describe('when a slot is specified', () => {
      it('renders', () => {
        const wrapper = shallow(
          <UpgradeShop upgrades={upgrades} slot={slot} />
        );

        expect(wrapper).toMatchElement(
          <div>
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
  });
});
