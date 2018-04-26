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
    describe('when updating the display', () => {
      const wrapper = shallow(<PlayerMenu player={player} />);

      expect(wrapper).toHaveState('activeDisplay', 0);
      wrapper.instance().setDisplay(Display.inventory);
      expect(wrapper).toHaveState('activeDisplay', Display.inventory);
    });
  });
});
