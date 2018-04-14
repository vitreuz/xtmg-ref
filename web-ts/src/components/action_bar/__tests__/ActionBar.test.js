import { shallow } from 'enzyme';
import * as React from 'react';
import ActionBar from '..';
import { Action } from '../../../client/Ship';
import XWingFont from '../../xwing_font';
import helpers from '../../../util/helpers';

describe('ActionBar', () => {
  let actions;

  describe('render', () => {
    describe('when none of the actions are modified', () => {
      beforeEach(() => {
        actions = [{ action: Action.BarrelRoll }, { action: Action.Focus }];
      });

      it('renders the actions as standard actions', () => {
        const wrapper = shallow(<ActionBar actions={actions} />);

        expect(wrapper).toMatchElement(
          <div>
            <span>
              <XWingFont symbol={Action.BarrelRoll} />
            </span>
            <span>
              <XWingFont symbol={Action.Focus} />
            </span>
          </div>
        );
      });
    });

    describe('when some actions are added by upgrades', () => {
      beforeEach(() => {
        actions = [
          { action: Action.BarrelRoll },
          { action: Action.Focus },
          { action: Action.Boost, upgrade: helpers.upgrades.engineUpgrade }
        ];
      });

      it('renders the actions with the modified action', () => {
        const wrapper = shallow(<ActionBar actions={actions} />);

        expect(wrapper).toMatchElement(
          <div>
            <span>
              <XWingFont />
            </span>
            <span>
              <XWingFont />
            </span>
            <span>
              <span>
                <XWingFont />
              </span>
              <XWingFont />
            </span>
          </div>
        );
      });
    });
  });
});
