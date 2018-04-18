import { shallow } from 'enzyme';
import * as React from 'react';
import StatusBar from '../index';
import XWingFont from '../../xwing_font/index';
import { ShipStat, FiringArc } from '../../../client/Ship';
import { FontType } from '../../xwing_font/XWingFont';

describe('StatusBar', () => {
  let base;
  let live;
  let mods;
  let firingArc;

  describe('render', () => {
    beforeEach(() => {
      base = {
        attack: 1,
        agility: 2,
        hull: 3,
        shield: 4
      };
    });

    describe('when there are no modifications', () => {
      it('shows the stats as defaults', () => {
        const wrapper = shallow(<StatusBar base={base} />);

        expect(wrapper).toMatchElement(
          <div>
            <div>
              <span>
                <span>1</span>
              </span>
              <span>
                <XWingFont />
              </span>
            </div>
            <div>
              <span>
                <span>2</span>
              </span>
              <span>
                <XWingFont />
              </span>
            </div>
            <div>
              <span>
                <span>3</span>
              </span>
              <span>
                <XWingFont />
              </span>
            </div>
            <div>
              <span>
                <span>4</span>
              </span>
              <span>
                <XWingFont />
              </span>
            </div>
          </div>
        );
      });
    });

    describe('when stats have been changed live', () => {
      beforeEach(() => {
        live = {
          attack: 0,
          agility: 1,
          hull: -1,
          shield: -3
        };
      });

      it('shows the stats with modifications displayed', () => {
        const wrapper = shallow(<StatusBar base={base} live={live} />);

        expect(wrapper).toMatchElement(
          <div>
            <div>
              <span>
                <span>1</span>
              </span>
              <span>
                <XWingFont />
              </span>
            </div>
            <div>
              <span>
                <span>3</span>
                <span>(+1)</span>
              </span>
              <span>
                <XWingFont />
              </span>
            </div>
            <div>
              <span>
                <span>2</span>
                <span>(-1)</span>
              </span>
              <span>
                <XWingFont />
              </span>
            </div>
            <div>
              <span>
                <span>1</span>
                <span>(-3)</span>
              </span>
              <span>
                <XWingFont />
              </span>
            </div>
          </div>
        );
      });
    });

    describe('when stats have been modified', () => {
      mods = {
        attack: 1,
        agility: 1,
        hull: 2,
        shield: 3
      };
      describe('when at full health', () => {
        it('shows the stats as defaults', () => {
          const wrapper = shallow(<StatusBar base={base} mods={mods} />);

          expect(wrapper).toMatchElement(
            <div>
              <div>
                <span>
                  <span>2</span>
                </span>
                <span>
                  <XWingFont />
                </span>
              </div>
              <div>
                <span>
                  <span>3</span>
                </span>
                <span>
                  <XWingFont />
                </span>
              </div>
              <div>
                <span>
                  <span>5</span>
                </span>
                <span>
                  <XWingFont />
                </span>
              </div>
              <div>
                <span>
                  <span>7</span>
                </span>
                <span>
                  <XWingFont />
                </span>
              </div>
            </div>
          );
        });
      });
    });
  });

  describe('attack stat', () => {
    describe('when the attack is default', () => {
      it('passes the standard attack to XWingFont', () => {
        const wrapper = shallow(<StatusBar base={base} />);

        const attack = wrapper.find('.status-attack');
        const font = attack.find(XWingFont);
        expect(font).toHaveProp('type', FontType.stat);
        expect(font).toHaveProp('symbol', ShipStat.Attack);
      });
    });

    describe('when the ships has an auxiliary rear arc', () => {
      beforeEach(() => {
        firingArc = FiringArc.AuxiliaryRear;
      });

      it('passes the non-standard firing_arc to XWingFont', () => {
        const wrapper = shallow(
          <StatusBar base={base} firing_arc={firingArc} />
        );

        const attack = wrapper.find('.status-attack');
        const font = attack.find(XWingFont);
        expect(font).toHaveProp('type', FontType.firing_arc);
        expect(font).toHaveProp('symbol', FiringArc.AuxiliaryRear);
      });
    });

    describe('when the ships has a turret arc', () => {
      beforeEach(() => {
        firingArc = FiringArc.Turret;
      });

      it('passes the non-standard firing_arc to XWingFont', () => {
        const wrapper = shallow(
          <StatusBar base={base} firing_arc={firingArc} />
        );

        const attack = wrapper.find('.status-attack');
        const font = attack.find(XWingFont);
        expect(font).toHaveProp('type', FontType.firing_arc);
        expect(font).toHaveProp('symbol', FiringArc.Turret);
      });
    });

    describe('when the ships has a bullseye arc', () => {
      beforeEach(() => {
        firingArc = FiringArc.Bullseye;
      });

      it('passes the non-standard firing_arc to XWingFont', () => {
        const wrapper = shallow(
          <StatusBar base={base} firing_arc={firingArc} />
        );

        const attack = wrapper.find('.status-attack');
        const font = attack.find(XWingFont);
        expect(font).toHaveProp('type', FontType.firing_arc);
        expect(font).toHaveProp('symbol', FiringArc.Bullseye);
      });
    });

    describe('when the ships has a auxiliary 180 arc', () => {
      beforeEach(() => {
        firingArc = FiringArc.Auxiliary180;
      });

      it('passes the non-standard firing_arc to XWingFont', () => {
        const wrapper = shallow(
          <StatusBar base={base} firing_arc={firingArc} />
        );

        const attack = wrapper.find('.status-attack');
        const font = attack.find(XWingFont);
        expect(font).toHaveProp('type', FontType.firing_arc);
        expect(font).toHaveProp('symbol', FiringArc.Auxiliary180);
      });
    });
  });
});
