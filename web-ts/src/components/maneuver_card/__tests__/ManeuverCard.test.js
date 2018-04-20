import { shallow } from 'enzyme';
import * as React from 'react';
import helpers from '../../../util/helpers';
import ManeuverCard from '../ManeuverCard';
import { ManeuverRow } from '../ManeuverCard';
import XWingFont from '../../xwing_font/index';
import { Bearing } from '../../../client/Ship';

describe('ManeuverCard', () => {
  let maneuvers;
  describe('render', () => {
    describe('when given only simple maneuvers', () => {
      beforeEach(() => {
        maneuvers = helpers.ships.xwing.maneuvers;
      });
      it('renders each row', () => {
        const wrapper = shallow(<ManeuverCard maneuvers={maneuvers} />);

        expect(wrapper).toMatchElement(
          <div>
            <table>
              <tbody>
                <ManeuverRow />
                <ManeuverRow />
                <ManeuverRow />
                <ManeuverRow />
              </tbody>
            </table>
          </div>
        );
      });
    });
  });

  describe('speed', () => {
    describe('when given a ship with a top speed of 5', () => {
      beforeEach(() => {
        maneuvers = helpers.ships.tiefighter.maneuvers;
      });

      it('passes the speeds 1 - 5', () => {
        const wrapper = shallow(<ManeuverCard maneuvers={maneuvers} />);

        [5, 4, 3, 2, 1].forEach((speed, i) => {
          const row = wrapper.find('ManeuverRow').at(i);
          expect(row).toHaveProp('speed', speed);
        });
      });
    });

    describe('when given a ship with a top speed of 4', () => {
      beforeEach(() => {
        maneuvers = helpers.ships.xwing.maneuvers;
      });

      it('passes the speeds 1 - 4', () => {
        const wrapper = shallow(<ManeuverCard maneuvers={maneuvers} />);

        [4, 3, 2, 1].forEach((speed, i) => {
          const row = wrapper.find('ManeuverRow').at(i);
          expect(row).toHaveProp('speed', speed);
        });
      });
    });

    describe('when given a ship with a negative speed to 4', () => {
      beforeEach(() => {
        maneuvers = helpers.ships.quadjumper.maneuvers;
      });

      it('passes the speeds -1 - 3', () => {
        const wrapper = shallow(<ManeuverCard maneuvers={maneuvers} />);

        [3, 2, 1, 0, -1].forEach((speed, i) => {
          const row = wrapper.find('ManeuverRow').at(i);
          expect(row).toHaveProp('speed', speed);
        });
      });
    });
  });
});

describe('ManeuverRow', () => {
  let row;
  let speed;
  describe('render', () => {
    describe('when passed a simple row', () => {
      beforeEach(() => {
        row = helpers.ships.xwing.maneuvers[2];
        speed = 3;
      });

      it('shows all the basic maneuvers', () => {
        const wrapper = shallow(<ManeuverRow speed={speed} row={row} />);

        expect(wrapper).toMatchElement(
          <tr>
            <th>3</th>
            <td>
              <XWingFont />
            </td>
            <td>
              <XWingFont />
            </td>
            <td>
              <XWingFont />
            </td>
            <td>
              <XWingFont />
            </td>
            <td>
              <XWingFont />
            </td>
          </tr>
        );
      });
    });
  });

  describe('bearings', () => {
    describe('speed', () => {
      describe('when the speed is positive', () => {
        beforeEach(() => {
          row = helpers.ships.tieadvanced.maneuvers[5];
          speed = 5;
        });

        it('should pass the stationary bearing', () => {
          const wrapper = shallow(<ManeuverRow speed={speed} row={row} />);

          const center = wrapper.find(XWingFont);
          expect(center).toHaveProp('symbol', Bearing.Straight);
        });
      });

      describe('when the speed is stationary', () => {
        beforeEach(() => {
          row = helpers.ships.lambdaclassshuttle.maneuvers[0];
          speed = 0;
        });

        it('should pass the stationary bearing', () => {
          const wrapper = shallow(<ManeuverRow speed={speed} row={row} />);

          const center = wrapper.find(XWingFont);
          expect(center).toHaveProp('symbol', Bearing.Stop);
        });
      });

      describe('when the speed is negative', () => {
        beforeEach(() => {
          row = [0, 3, 3, 3];
          speed = -1;
        });

        it('should pass the stationary bearing', () => {
          const wrapper = shallow(<ManeuverRow speed={speed} row={row} />);

          const left = wrapper.find(XWingFont).at(0);
          expect(left).toHaveProp('symbol', Bearing.ReverseBankLeft);

          const center = wrapper.find(XWingFont).at(1);
          expect(center).toHaveProp('symbol', Bearing.ReverseStraight);

          const right = wrapper.find(XWingFont).at(2);
          expect(right).toHaveProp('symbol', Bearing.ReverseBankRight);
        });
      });
    });

    describe('length', () => {
      describe('when given troll/sloop/kturn maneuvers', () => {
        beforeEach(() => {
          row = helpers.ships.tiesilencer.maneuvers[3];
          speed = 3;
        });

        it('removes empty cells after the standard maneuvers', () => {
          const wrapper = shallow(<ManeuverRow row={row} speed={speed} />);

          const cells = wrapper.find('td');
          expect(cells.length).toEqual(7);
        });
      });
    });
  });
});
