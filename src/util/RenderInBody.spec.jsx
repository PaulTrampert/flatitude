import RenderInBody from './RenderInBody.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import document from './document.js';
jest.mock('react-dom');
jest.mock('./document.js', () => ({}));

describe('RenderInBody', () => {
  let subject;

  beforeEach(() => {
    document.createElement = jest.fn().mockReturnValue('element'),
    document.body = {
      appendChild: jest.fn(),
      removeChild: jest.fn()
    };

    subject = shallow(<RenderInBody><div className="test-div"></div></RenderInBody>, {disableLifecycleMethods: true});
  });

  describe('render', () => {
    it('renders nothing where it is used', () => {
      expect(subject.isEmptyRender()).toBe(true);
    });
  });

  describe('componentDidMount', () => {
    let instance;
    beforeEach(() => {
      instance = subject.instance();
      instance.componentDidMount();
    });

    it('creates a div directly inside body', () => {
      expect(subject.instance().element).toBeDefined();
      expect(document.body.appendChild).toHaveBeenCalledWith(subject.instance().element);
    });

    it('renders children on the div', () => {
      expect(ReactDOM.render).toHaveBeenCalled();
    });
  });

  describe('componentWillUnmount', () => {
    let instance;
    let element;

    beforeEach(() => {
      instance = subject.instance();
      instance.componentDidMount();
      element = instance.element;
      instance.componentWillUnmount();
    });

    it('removes the div from the body', () => {
      expect(ReactDOM.unmountComponentAtNode).toHaveBeenCalledWith(element);
      expect(document.body.removeChild).toHaveBeenCalledWith(element);
      expect(instance.element).toBe(null);
    });
  });
});