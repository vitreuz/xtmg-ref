import React from 'react';
import { shallow } from 'enzyme';
import { Display } from '../../player_menu/PlayerMenu';
import MenuBar from '../index';

describe('MenuBar', () => {
  let type;
  let onClick = jest.fn();
  let current;
  beforeEach(() => {
    type = Display;
    current = 1;
    onClick.mockReset();
  });
  describe('render', () => {
    describe('whek passed an enum type', () => {
      it('displays one button for each of the enums types', () => {
        const wrapper = shallow(<MenuBar type={type} />);

        expect(wrapper).toMatchElement(
          <div>
            <ul>
              <li>
                <button>player</button>
              </li>
              <li>
                <button>inventory</button>
              </li>
              <li>
                <button>shop</button>
              </li>
            </ul>
          </div>
        );
      });
    });
  });

  describe('buttons', () => {
    describe('when a button is already active', () => {
      it('disables only that button', () => {
        const wrapper = shallow(
          <MenuBar type={type} onClick={onClick} currentID={current} />
        );

        const buttonOne = wrapper.find('button').at(0);
        expect(buttonOne).toHaveProp('disabled', false);

        const buttonTwo = wrapper.find('button').at(1);
        expect(buttonTwo).toHaveProp('disabled', true);

        const buttonThree = wrapper.find('button').at(2);
        expect(buttonThree).toHaveProp('disabled', false);
      });
    });

    describe('when the component is locked', () => {
      it('disables all buttons', () => {
        const wrapper = shallow(
          <MenuBar
            type={type}
            onClick={onClick}
            currentID={current}
            lock={true}
          />
        );

        const buttons = wrapper.find('button');
        buttons.forEach(button => {
          expect(button).toHaveProp('disabled', true);
        });
      });
    });

    describe('when a button is clicked', () => {
      it('passes the corresponding id to a callback', () => {
        const wrapper = shallow(<MenuBar type={type} onClick={onClick} />);

        const buttonOne = wrapper.find('button').at(0);
        buttonOne.simulate('click');
        expect(onClick.mock.calls.length).toBe(1);
        expect(onClick.mock.calls[0][0]).toBe(0);
      });
    });
  });
});
