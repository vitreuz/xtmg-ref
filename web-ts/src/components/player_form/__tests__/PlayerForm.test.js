import React from 'react';
import { shallow, mount } from 'enzyme';
import PlayerForm from '../index';
import { start } from 'repl';
import helpers from '../../../util/helpers';

describe('PlayerForm', () => {
  let createPlayer = jest.fn(() => 'some-id');
  let selectPlayer = jest.fn();
  let cancelForm = jest.fn();
  let starterShips = [];

  beforeEach(() => {
    starterShips = [helpers.ships.xwing, helpers.ships.ywing];

    createPlayer.mockClear();
    selectPlayer.mockClear();
    cancelForm.mockReset();
  });

  describe('render', () => {
    it('renders the player form', () => {
      const wrapper = shallow(<PlayerForm starterShips={starterShips} />);

      expect(wrapper).toMatchElement(
        <form>
          <label>
            Name
            <input />
          </label>
          <label>
            Callsign
            <input />
          </label>
          <label>
            Ship
            <select>
              <option />
              <option>X-wing</option>
              <option>Y-wing</option>
            </select>
          </label>
          <button>Submit</button>
          <button>Cancel</button>
        </form>
      );
    });
  });

  describe('state', () => {
    describe('setting name', () => {
      it('changes the state', () => {
        const wrapper = mount(<PlayerForm starterShips={starterShips} />);

        const input = wrapper.find('.name-input');
        input.simulate('change', { target: { value: 'abc' } });
        expect(wrapper).toHaveState('name', 'abc');
      });
    });

    describe('setting callsign', () => {
      it('changes the state', () => {
        const wrapper = mount(<PlayerForm starterShips={starterShips} />);

        const input = wrapper.find('.callsign-input');
        input.simulate('change', { target: { value: 'abc' } });
        expect(wrapper).toHaveState('callsign', 'abc');
      });
    });

    describe('setting ship', () => {
      it('changes the state', () => {
        const wrapper = mount(<PlayerForm starterShips={starterShips} />);

        const input = wrapper.find('.ship-select');
        input.simulate('change', { target: { value: 'abc' } });
        expect(wrapper).toHaveState('ship_xws', 'abc');
      });
    });
  });

  describe('submit', () => {
    describe('when not fully filled', () => {
      it('prevents pressing submit', () => {
        const wrapper = shallow(
          <PlayerForm CreatePlayer={createPlayer} starterShips={starterShips} />
        );
        const button = wrapper.find('.submit-button');
        expect(button).toHaveProp('disabled', true);
      });
    });

    describe('when filled', () => {
      it('prevents the default', () => {
        const wrapper = shallow(
          <PlayerForm CreatePlayer={createPlayer} starterShips={starterShips} />
        );
        const form = wrapper.find('form');
        const preventDefault = jest.fn();
        const event = { preventDefault: preventDefault };

        form.simulate('submit', event);
        expect(preventDefault.mock.calls.length).toBe(1);
      });

      it('calls CreatePlayer with the current state the calls SelectPlayer', async () => {
        const wrapper = shallow(
          <PlayerForm
            CreatePlayer={createPlayer}
            SelectPlayer={selectPlayer}
            starterShips={starterShips}
          />
        ).setState({
          name: 'some-name',
          callsign: 'some-callsign',
          ship_xws: 'some-ship'
        });
        await wrapper.instance().handleSubmit();

        expect(createPlayer).toBeCalled();
        expect(selectPlayer).toBeCalledWith('some-id');
      });
    });
  });

  describe('cancel', () => {
    it('calls CancelForm', () => {
      const wrapper = shallow(
        <PlayerForm CancelForm={cancelForm} starterShips={starterShips} />
      );

      const cancel = wrapper.find('.cancel-button');
      cancel.simulate('click');
      expect(cancelForm.mock.calls.length).toBe(1);
    });
  });
});
