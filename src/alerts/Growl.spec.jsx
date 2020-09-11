import React from 'react';
import {shallow} from 'enzyme';
import Growl from './Growl.jsx';
import window from '../util/window.js';

jest.mock('../util/window.js');

describe('Growl', () => {
  let subject;
  let instance;
  let onDismiss;
  let onExpire;

  beforeEach(() => {
    onDismiss = jest.fn();
    onExpire = jest.fn();
    subject = shallow(<Growl
      id={2}
      type='info'
      onDismiss={onDismiss}
      onExpire={onExpire}
    >
      hi there!
    </Growl>, {disableLifecycleMethods: true});

    instance = subject.instance();
    instance.ref = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    };
  });

  describe('componentDidMount', () => {
    it('sets the timeout', () => {
      instance.componentDidMount();

      expect(window.setTimeout).toHaveBeenCalledWith(instance.handleExpire, 10000);
    });

    it('adds an event listener for animationend to the ref', () => {
      instance.componentDidMount();

      expect(instance.ref.addEventListener).toHaveBeenCalledWith('animationend', instance.onFadeoutEnd);
    });
  });

  describe('componentWillUnmount', () => {
    it('removes the event listener from the ref', () => {
      instance.componentWillUnmount();

      expect(instance.ref.removeEventListener).toHaveBeenCalledWith('animationend', instance.onFadeoutEnd);
    });
  });

  describe('onFadeoutEnd', () => {
    let event;

    beforeEach(() => {
      event = {
        animationName: 'growl-fadeout'
      };
    });

    describe('when the animationName is growl-fadeout', () => {
      it('calls onExpire', () => {
        instance.onFadeoutEnd(event);

        expect(onExpire).toHaveBeenCalledWith(2);
      });
    });

    describe('when the animationName is not growl-fadeout', () => {
      beforeEach(() => {
        event.animationName = 'doop';
      });

      it('does not call onExpire', () => {
        instance.onFadeoutEnd(event);

        expect(onExpire).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe("handleExpire", () => {
    beforeEach(() => {
      instance.timer = {};
    });

    it('deletes timer', () => {
      instance.handleExpire();

      expect(instance.timer).not.toBeDefined();
    });

    it('sets expiring to true', () => {
      instance.handleExpire();

      expect(subject.state().expiring).toBe(true);
    });
  });

  describe('handleRef', () => {
    it("sets the ref", () => {
      let ref = {};

      instance.handleRef(ref);
      expect(instance.ref).toBe(ref);
    });
  });

  describe('handleDismiss', () => {
    let timer;
    beforeEach(() => {
      timer = {};
      instance.timer = timer;
    });

    it('clears any timer', () => {
      instance.handleDismiss();

      expect(window.clearTimeout).toHaveBeenCalledWith(timer);
    });

    it('deletes the timer', () => {
      instance.handleDismiss();

      expect(instance.timer).not.toBeDefined();
    });

    it('calls onDismiss', () => {
      instance.handleDismiss();

      expect(onDismiss).toHaveBeenCalledWith(2);
    });
  });

  describe('render', () => {
    it('binds the dismiss button', () => {
      expect(subject.find('div.dismiss button').props().onClick).toBe(subject.instance().handleDismiss);
    });

    it('renders an info growl', () => {
      expect(subject).toMatchSnapshot();
    });

    it('renders a warning growl', () => {
      subject.setProps({type: 'warning'});
      expect(subject).toMatchSnapshot();
    });

    it('renders a success growl', () => {
      subject.setProps({type: 'success'});
      expect(subject).toMatchSnapshot();
    });

    it('renders a danger growl', () => {
      subject.setProps({type: 'danger'});
      expect(subject).toMatchSnapshot();
    });

    it('renders a primary growl', () => {
      subject.setProps({type: 'primary'});
      expect(subject).toMatchSnapshot();
    });

    it('renders an expiring growl', () => {
      subject.setState({expiring: true});
      expect(subject).toMatchSnapshot();
    });
  });
});