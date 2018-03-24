import React from 'react';
import {shallow} from 'enzyme';
import RenderInBody from '../util/RenderInBody.jsx';
import DropdownButtonLoader from 'inject-loader!./DropdownButton.jsx';

describe('DropdownButtonLoader', () => {
  let DropdownButton;
  let window;
  let document;
  let buttonElement;
  let ReactDOM;

  beforeEach(() => {
    window = {
      scrollY: 1,
      scrollX: 2,
      outerWidth: 3
    };
    document = {
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener')
    };

    buttonElement = {
      getBoundingClientRect: jasmine.createSpy('getBoundingClientRect').and.returnValue({bottom: 4, right: 5})
    };

    ReactDOM = {
      findDOMNode: jasmine.createSpy('findDOMNode').and.returnValue(buttonElement)
    };

    DropdownButton = DropdownButtonLoader({
      '../util/window.js': window,
      '../util/document.js': document,
      'react-dom': ReactDOM
    }).default;
  });

  describe('render', () => {
    let subject;
    beforeEach(() => {
      subject = shallow(<DropdownButton title="herp" className="derp" type="primary" random="random">derp</DropdownButton>, {disableLifecycleMethods: true});
    });
  
    it('renders a button with the correct classes', () => {
      expect(subject.at(0).props().className).toBe('derp');
    });

    it('renders the correct type of button', () => {
      expect(subject.at(0).props().type).toBe('primary');
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