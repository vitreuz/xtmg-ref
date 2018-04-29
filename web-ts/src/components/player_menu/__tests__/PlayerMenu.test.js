import { shallow } from 'enzyme';
import React from 'react';
import helpers from '../../../util/helpers';
import MenuBar from '../../menu_bar';
import PlayerCard from '../../player_card';
import UpgradeInventory from '../../upgrade_inventory';
import UpgradeShop from '../../upgrade_shop';
import PlayerMenu, { Display } from '../PlayerMenu';

describe('PlayerMenu', () => {
  let activeDisplay;
  let player = helpers.players.leeroyjenkins;
  let equipUpgrade = jest.fn();

  beforeEach(() => {
    equipUpgrade.mockReset();
  });

  describe('render', () => {
    describe('when the active display is `player`', () => {
      beforeEach(() => {
        activeDisplay = Display.player;
      });

      it('renders a PlayerCard', () => {
        const wrapper = shallow(<PlayerMenu player={player} />).setState({
          activeDisplay: activeDisplay
        });

        expect(wrapper).toMatchElement(
          <div>
            <MenuBar />
            <PlayerCard />
          </div>
        );
      });
    });

    describe('when the active display is `inventory`', () => {
      beforeEach(() => {
        activeDisplay = Display.inventory;
      });

      it('renders a PlayerCard', () => {
        const wrapper = shallow(<PlayerMenu player={player} />).setState({
          activeDisplay: activeDisplay
        });

        expect(wrapper).toMatchElement(
          <div>
            <MenuBar />
            <UpgradeInventory />
          </div>
        );
      });
    });

    describe('when the active display is `shop`', () => {
      beforeEach(() => {
        activeDisplay = Display.shop;
      });

      it('renders a PlayerCard', () => {
        const wrapper = shallow(<PlayerMenu player={player} />).setState({
          activeDisplay: activeDisplay
        });

        expect(wrapper).toMatchElement(
          <div>
            <MenuBar />
            <UpgradeShop />
          </div>
        );
      });
    });
  });

  describe('state', () => {
    describe('active display', () => {
      describe('when updating the display', () => {
        const wrapper = shallow(<PlayerMenu player={player} />);

        expect(wrapper).toHaveState('activeDisplay', 0);
        wrapper.instance().setDisplay(Display.inventory);
        expect(wrapper).toHaveState('activeDisplay', Display.inventory);
      });
    });

    describe('active slot', () => {
      describe('when updating the active slot', () => {
        const wrapper = shallow(<PlayerMenu player={player} />);

        expect(wrapper).toHaveState('activeSlot', undefined);
        wrapper.instance().setSlot({ slot: 0 });
        expect(wrapper).toHaveState('activeSlot', { slot: 0 });
      });
    });
  });

  describe('selectUpgrade', () => {
    describe('when given an UpgradeSlot with no upgrade', () => {
      it('sets the active slot then switches to the shop display', () => {
        const wrapper = shallow(<PlayerMenu player={player} />);

        wrapper.instance().selectUpgrade({ slot: 2 });
        expect(wrapper).toHaveState({
          activeSlot: { slot: 2 },
          activeDisplay: Display.shop
        });
      });
    });

    describe('when given an UpgradeSlot with an upgrade', () => {
      it('sets the active slot then switches to the inventory display', () => {
        const wrapper = shallow(<PlayerMenu player={player} />);

        wrapper
          .instance()
          .selectUpgrade({ slot: 2, upgrade: helpers.upgrades.wired });
        expect(wrapper).toHaveState({
          activeSlot: { slot: 2, upgrade: helpers.upgrades.wired },
          activeDisplay: Display.inventory
        });
      });
    });
  });

  describe('onEquip', () => {
    describe('whenever an upgrade is equipped', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = shallow(
          <PlayerMenu player={player} EquipUpgrade={equipUpgrade} />
        ).setState({
          activeSlot: 3,
          activeDisplay: Display.inventory
        });
      });

      it('resets the activeSlot and activeDisplay', () => {
        const inv = wrapper.find(UpgradeInventory);
        inv.prop('onEquip')();

        expect(wrapper).toHaveState({
          activeSlot: undefined,
          activeDisplay: Display.player
        });
      });

      it('calls the EquipUpgrade function', () => {
        const inv = wrapper.find(UpgradeInventory);
        inv.prop('onEquip')(256);

        expect(equipUpgrade.mock.calls.length).toBe(1);
        expect(equipUpgrade.mock.calls[0][0]).toBe(256);
      });
    });
  });

  describe('MenuBar', () => {
    describe('when activeSlot is still undefined', () => {
      it('locks the MenuBar', () => {
        const wrapper = shallow(<PlayerMenu player={player} />).setState({
          activeSlot: undefined
        });

        const menu = wrapper.find(MenuBar);
        expect(menu).toHaveProp('lock', true);
      });
    });

    describe('when activeSlot has been defined', () => {
      it('locks the MenuBar', () => {
        const wrapper = shallow(<PlayerMenu player={player} />).setState({
          activeSlot: { slot: 0 }
        });

        const menu = wrapper.find(MenuBar);
        expect(menu).toHaveProp('lock', false);
      });
    });
  });
});
