import React from 'react';
import {shallow} from 'enzyme';
import RenderInBody from '../util/RenderInBody.jsx';
import DropdownButton from './DropdownButton.jsx';
import document from '../util/document.js';
import ReactDOM from 'react-dom';
jest.mock('react-dom');
jest.mock('../util/document.js', () => ({}));

describe('DropdownButtonLoader', () => {
  let buttonElement;

  beforeEach(() => {
    document.addEventListener = jest.fn();
    document.removeEventListener = jest.fn();

    buttonElement = {
      getBoundingClientRect: jest.fn().mockReturnValue({bottom: 4, right: 5})
    };

    ReactDOM.findDOMNode.mockReturnValue(buttonElement);
  });

  describe('render', () => {
    let subject;
    beforeEach(() => {
      subject = shallow(<DropdownButton title="herp" className="derp" type="primary" random="random">derp</DropdownButton>, {disableLifecycleMethods: true});
    });

    it('renders a button with the correct classes', () => {
      expect(subject.at(0).props().className).toBe('derp primary');
    });

    it('renders the correct type of button', () => {
      expect(subject.at(0).props().type).toBe('button');
    });

    it('adds arbitrary properties to the button', () => {
      expect(subject.at(0).props().random).toBe('random');
    });

    it('renders the title', () => {
      expect(subject.childAt(0).text()).toBe('herp');
    });

    it("doesn't render the menu initially", () => {
      expect(subject.find(RenderInBody).length).toBe(0);
    });

    describe('componentDidMount', () => {
      it('binds handleClickOutside to document click', () => {
        subject.instance().componentDidMount();

        expect(document.addEventListener).toHaveBeenCalledWith('mousedown', subject.instance().handleClickOutside);
      });
    });

    describe('componentWillUnmount', () => {
      it('unbinds handleClickOutside to document click', () => {
        subject.instance().componentWillUnmount();

        expect(document.removeEventListener).toHaveBeenCalledWith('mousedown', subject.instance().handleClickOutside);
      });
    });
  });
});