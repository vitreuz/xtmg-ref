import * as React from 'react';

import { shallow } from 'enzyme';
import UpgradeBase from '../UpgradeBase';
import helpers from '../../../util/helpers';
import XWingFont from '../../xwing_font/index';

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

describe('UpgradeBase', () => {
  let upgrade = {};

  describe('render', () => {
    describe('when given an offense upgrade', () => {
      beforeEach(() => {
        upgrade = turretUpgrade;
      });

      it('renders the upgrade with combat stats', () => {
        const wrapper = shallow(<UpgradeBase upgrade={upgrade} />);

        expect(wrapper).toMatchElement(
          <div>
            <div>
              <span>Ion Cannon Turret</span>
            </div>
            <div>
              <div>
                <span>{/*attack icon*/}</span>
                <span>4</span>
              </div>
              <div>
                <span>Range</span> <span>1-2</span>
              </div>
            </div>
            <div>
              <span>
                {/*
              <strong>Attack:</strong> Attack 1 ship (even a ship outside your
              firing arc).<br />
              <br />If this attack hits the target ship, the ship suffers 1
              damage and receives 1 ion token. Then cancel <strong>
                all
              </strong>{" "}
              dice results.
            */}
              </span>
              {/* refer to story: https://github.com/airbnb/enzyme/issues/1297 */}
            </div>
          </div>
        );
      });
    });

    describe('when given a non-offense upgrade', () => {
      beforeEach(() => {
        upgrade = intimidationUpgrade;
      });

      it('renders the upgrade and the purchase button', () => {
        const wrapper = shallow(<UpgradeBase upgrade={upgrade} />);

        expect(wrapper).toMatchElement(
          <div>
            <div>
              <span>Intimidation</span>
            </div>
            <div>
              <span>
                {/* While you are touching an enemy ship, reduce that ship's agility
            value by 1. */}
              </span>
            </div>
          </div>
        );
      });
    });

    describe('when given an upgrade with inline icons', () => {
      beforeEach(() => {
        upgrade = helpers.upgrades.heavyscykinterceptor;
      });

      it('renders the upgrade with an icon instead of the purchase button', () => {
        const wrapper = shallow(<UpgradeBase upgrade={upgrade} />);

        expect(wrapper).toMatchElement(
          <div>
            <div>
              <span>"Heavy Scyk" Interceptor</span>
            </div>
            <div>
              <span>{/* Your upgrade bar gains the */}</span>
              <span>
                <XWingFont />
              </span>
              <span>{/* , */}</span>
              <span>
                <XWingFont />
              </span>
              <span>{/* or */}</span>
              <span>
                <XWingFont />
              </span>
              <span>{/* upgrade icon. */}</span>
            </div>
          </div>
        );
      });
    });
  });
});
