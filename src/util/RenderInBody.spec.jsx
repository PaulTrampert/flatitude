import RenderInBodyLoader from 'inject-loader!./RenderInBody.jsx';
import React from 'react';
import {shallow} from 'enzyme';

describe('RenderInBody', () => {
  let subject;
  let RenderInBody;
  let document;
  let ReactDOM;

  beforeEach(() => {
    document = {
      createElement: jasmine.createSpy('createElement').and.returnValue('element'),
      body: {
        appendChild: jasmine.createSpy('appendChild'),
        removeChild: jasmine.createSpy('removeChild')
      }
    };

    ReactDOM = jasmine.createSpyObj('ReactDOM', ['render', 'unmountComponentAtNode']);

    RenderInBody = RenderInBodyLoader({
      'react-dom': ReactDOM,
      './document.js': document
    }).default;
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