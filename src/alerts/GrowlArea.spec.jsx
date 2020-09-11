import React from 'react';
import {shallow} from 'enzyme';
import GrowlArea from './GrowlArea.jsx';
import Growl from './Growl.jsx';
import growler from './growler.js';

jest.mock('./growler.js');

describe('GrowlArea', () => {
  let subject;
  let unsubscribe;
  let growls;
  let instance;

  beforeEach(() => {
    unsubscribe = jest.fn();
    growler.subscribe.mockReturnValue(unsubscribe);
    growls = [
      {
        id: 1,
        type: 'info',
        message: 'herp',
        onDismiss: jest.fn()
      },
      {
        id: 2,
        type: 'danger',
        message: 'derp',
        onDismiss: jest.fn()
      },
    ];

    subject = shallow(<GrowlArea />, {disableLifecycleMethods: true});
    instance = subject.instance();
  });

  describe('constructor', () => {
    it('initializes state', () => {
      expect(subject.state()).toEqual({
        growls: []
      });
    });
  });

  describe('componentDidMount', () => {
    it('subscribes to the growler', () => {
      instance.componentDidMount();

      expect(growler.subscribe).toHaveBeenCalledWith(instance.showGrowl);
    });

    it('keeps the unsubscribe function', () => {
      instance.componentDidMount();

      expect(instance.unsub).toBe(unsubscribe);
    });
  });

  describe('componentWillUnmount', () => {
    beforeEach(() => {
      instance.componentDidMount();
    });

    it('unsubscribes from the growler', () => {
      instance.componentWillUnmount();
      expect(unsubscribe).toHaveBeenCalled();
    });

    it('deletes the unsub function', () => {
      instance.componentWillUnmount();
      expect(instance.unsub).not.toBeDefined();
    });
  });

  describe('showGrowl', () => {
    let growl;
    beforeEach(() => {
      growl = {
        id: 1,
        type: 'info',
        message: 'flerp',
        onDismiss: jest.fn()
      };

      subject.setState({growls});
    });

    it('adds the growl to the list of growls', () => {
      instance.showGrowl(growl);

      expect(subject.state().growls).toEqual([
        ...growls,
        growl
      ]);
    });
  });

  describe('handleExpire', () => {
    beforeEach(() => {
      subject.setState({growls});
    });

    it('expires the correct growl', () => {
      instance.handleExpire(2);

      expect(subject.state().growls).toEqual([
        growls[0]
      ]);
    });
  });

  describe('handleDismiss', () => {
    beforeEach(() => {
      subject.setState({growls});
    });

    it('dismisses the correct growl', () => {
      instance.handleDismiss(2);

      expect(subject.state().growls).toEqual([
        growls[0]
      ]);
    });

    it("calls the growl's onDismiss function", () => {
      instance.handleDismiss(2);

      expect(growls[1].onDismiss).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    describe('when there are no growls', () => {
      it('renders an empty growl area in the body', () => {
        expect(subject).toMatchSnapshot();
      });
    });

    describe('when there are growls', () => {
      beforeEach(() => {
        subject.setState({growls});
      });

      it('renders the growls in the growl area', () => {
        expect(subject).toMatchSnapshot();
      });

      it('binds onDismiss for each growl', () => {
        expect(subject.find(Growl).at(0).props().onDismiss).toBe(instance.handleDismiss);
        expect(subject.find(Growl).at(1).props().onDismiss).toBe(instance.handleDismiss);
      });

      it('binds onExpire for each growl', () => {
        expect(subject.find(Growl).at(0).props().onExpire).toBe(instance.handleExpire);
        expect(subject.find(Growl).at(1).props().onExpire).toBe(instance.handleExpire);
      });
    });
  });
});
