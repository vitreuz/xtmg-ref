import React from 'react';
import { shallow } from 'enzyme';
import XWingFont, { FontType } from '../XWingFont';
import { Action, FiringArc, Bearing, ShipStat } from '../../../client/Ship';
import { UpgradeSlotType } from '../../../client/Upgrade';

describe('XWingFontProps', () => {
  let type;
  let symbol;

  describe('types', () => {
    describe('actions', () => {
      beforeEach(() => {
        type = FontType.action;
      });

      it('converts to the correct action symbols', () => {
        [
          {
            e: Action.BarrelRoll,
            c: 'xwing-font xwing-miniatures-font-barrelroll'
          },
          {
            e: Action.Boost,
            c: 'xwing-font xwing-miniatures-font-boost'
          },
          {
            e: Action.Cloak,
            c: 'xwing-font xwing-miniatures-font-cloak'
          },
          {
            e: Action.Coordinate,
            c: 'xwing-font xwing-miniatures-font-coordinate'
          },
          {
            e: Action.Evade,
            c: 'xwing-font xwing-miniatures-font-evade'
          },
          {
            e: Action.Focus,
            c: 'xwing-font xwing-miniatures-font-focus'
          },
          {
            e: Action.Jam,
            c: 'xwing-font xwing-miniatures-font-jam'
          },
          {
            e: Action.Recover,
            c: 'xwing-font xwing-miniatures-font-recover'
          },
          {
            e: Action.Reinforce,
            c: 'xwing-font xwing-miniatures-font-reinforce'
          },
          {
            e: Action.Reload,
            c: 'xwing-font xwing-miniatures-font-reload'
          },
          {
            e: Action.RotateArc,
            c: 'xwing-font xwing-miniatures-font-rotatearc'
          },
          {
            e: Action.SLAM,
            c: 'xwing-font xwing-miniatures-font-slam'
          },
          {
            e: Action.TargetLock,
            c: 'xwing-font xwing-miniatures-font-targetlock'
          }
        ].forEach(test => {
          const { e, c } = test;
          const wrapper = shallow(<XWingFont type={type} symbol={e} />);

          expect(wrapper).toHaveProp('className', c);
        });
      });
    });

    describe('firing_arc', () => {
      beforeEach(() => {
        type = FontType.firing_arc;
      });

      it('converts to the correct firing_arc symbols', () => {
        [
          {
            e: FiringArc.Auxiliary180,
            c: 'xwing-font xwing-miniatures-font-attack-180'
          },
          {
            e: FiringArc.AuxiliaryRear,
            c: 'xwing-font xwing-miniatures-font-attack-frontback'
          },
          {
            e: FiringArc.Bullseye,
            c: 'xwing-font xwing-miniatures-font-attack-bullseye'
          },
          {
            e: FiringArc.Front,
            c: 'xwing-font xwing-miniatures-font-attack'
          },
          {
            e: FiringArc.Turret,
            c: 'xwing-font xwing-miniatures-font-attack-turret'
          }
        ].forEach(test => {
          const { e, c } = test;
          const wrapper = shallow(<XWingFont type={type} symbol={e} />);

          expect(wrapper).toHaveProp('className', c);
        });
      });
    });

    describe('maneuvers', () => {
      beforeEach(() => {
        type = FontType.maneuver;
      });

      it('converts to the correct action symbols', () => {
        [
          {
            e: Bearing.BankLeft,
            c: 'xwing-font xwing-miniatures-font-bankleft'
          },
          {
            e: Bearing.BankRight,
            c: 'xwing-font xwing-miniatures-font-bankright'
          },
          {
            e: Bearing.KTurn,
            c: 'xwing-font xwing-miniatures-font-kturn'
          },
          {
            e: Bearing.ReverseBankLeft,
            c: 'xwing-font xwing-miniatures-font-reversebankleft'
          },
          {
            e: Bearing.ReverseBankRight,
            c: 'xwing-font xwing-miniatures-font-reversebankright'
          },
          {
            e: Bearing.ReverseStraight,
            c: 'xwing-font xwing-miniatures-font-reversestraight'
          },
          {
            e: Bearing.SLoopLeft,
            c: 'xwing-font xwing-miniatures-font-sloopleft'
          },
          {
            e: Bearing.SLoopRight,
            c: 'xwing-font xwing-miniatures-font-sloopright'
          },
          {
            e: Bearing.Stop,
            c: 'xwing-font xwing-miniatures-font-stop'
          },
          {
            e: Bearing.Straight,
            c: 'xwing-font xwing-miniatures-font-straight'
          },
          {
            e: Bearing.TRollLeft,
            c: 'xwing-font xwing-miniatures-font-trollleft'
          },
          {
            e: Bearing.TRollRight,
            c: 'xwing-font xwing-miniatures-font-trollright'
          },
          {
            e: Bearing.TurnLeft,
            c: 'xwing-font xwing-miniatures-font-turnleft'
          },
          {
            e: Bearing.TurnRight,
            c: 'xwing-font xwing-miniatures-font-turnright'
          }
        ].forEach(test => {
          const { e, c } = test;
          const wrapper = shallow(<XWingFont type={type} symbol={e} />);

          expect(wrapper).toHaveProp('className', c);
        });
      });
    });

    describe('slot', () => {
      beforeEach(() => {
        type = FontType.slot;
      });

      it('converts to the correct action symbols', () => {
        [
          {
            e: UpgradeSlotType.Astromech,
            c: 'xwing-font xwing-miniatures-font-astromech'
          },
          {
            e: UpgradeSlotType.Bomb,
            c: 'xwing-font xwing-miniatures-font-bomb'
          },
          {
            e: UpgradeSlotType.Cannon,
            c: 'xwing-font xwing-miniatures-font-cannon'
          },
          {
            e: UpgradeSlotType.Cargo,
            c: 'xwing-font xwing-miniatures-font-cargo'
          },
          {
            e: UpgradeSlotType.Crew,
            c: 'xwing-font xwing-miniatures-font-crew'
          },
          {
            e: UpgradeSlotType.Elite,
            c: 'xwing-font xwing-miniatures-font-elite'
          },
          {
            e: UpgradeSlotType.Hardpoint,
            c: 'xwing-font xwing-miniatures-font-hardpoint'
          },
          {
            e: UpgradeSlotType.Illicit,
            c: 'xwing-font xwing-miniatures-font-illicit'
          },
          {
            e: UpgradeSlotType.Missile,
            c: 'xwing-font xwing-miniatures-font-missile'
          },
          {
            e: UpgradeSlotType.Modification,
            c: 'xwing-font xwing-miniatures-font-modification'
          },
          {
            e: UpgradeSlotType.SalvagedAstromech,
            c: 'xwing-font xwing-miniatures-font-salvagedastromech'
          },
          {
            e: UpgradeSlotType.System,
            c: 'xwing-font xwing-miniatures-font-system'
          },
          {
            e: UpgradeSlotType.Team,
            c: 'xwing-font xwing-miniatures-font-team'
          },
          {
            e: UpgradeSlotType.Tech,
            c: 'xwing-font xwing-miniatures-font-tech'
          },
          {
            e: UpgradeSlotType.Title,
            c: 'xwing-font xwing-miniatures-font-title'
          },
          {
            e: UpgradeSlotType.Torpedo,
            c: 'xwing-font xwing-miniatures-font-torpedo'
          },
          {
            e: UpgradeSlotType.Turret,
            c: 'xwing-font xwing-miniatures-font-turret'
          }
        ].forEach(test => {
          const { e, c } = test;
          const wrapper = shallow(<XWingFont type={type} symbol={e} />);

          expect(wrapper).toHaveProp('className', c);
        });
      });
    });

    describe('stat', () => {
      beforeEach(() => {
        type = FontType.stat;
      });

      it('converts to the correct action symbols', () => {
        [
          {
            e: ShipStat.Agility,
            c: 'xwing-font xwing-miniatures-font-agility'
          },
          {
            e: ShipStat.Attack,
            c: 'xwing-font xwing-miniatures-font-attack'
          },
          {
            e: ShipStat.Hull,
            c: 'xwing-font xwing-miniatures-font-hull'
          },
          {
            e: ShipStat.Shield,
            c: 'xwing-font xwing-miniatures-font-shield'
          }
        ].forEach(test => {
          const { e, c } = test;
          const wrapper = shallow(<XWingFont type={type} symbol={e} />);

          expect(wrapper).toHaveProp('className', c);
        });
      });
    });
  });
});
