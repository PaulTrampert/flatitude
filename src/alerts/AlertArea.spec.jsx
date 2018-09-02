import React from 'react';
import {shallow} from 'enzyme';
import AlertAreaLoader from 'inject-loader!./AlertArea.jsx';

describe('AlertArea', () => {
  let AlertArea;
  let alerter;
  let unsub;

  beforeEach(() => {
    unsub = jasmine.createSpy('unsub');
    alerter = jasmine.createSpyObj('alerter', ['subscribe']);
    alerter.subscribe.and.returnValue(unsub);

    AlertArea = AlertAreaLoader({
      './alerter.js': alerter
    }).default;
  });

  describe('componentDidMount', () => {
    let subject;

    beforeEach(() => {
      subject = shallow(<AlertArea />, {disableLifecycleMethods: true});
    });

    it('subscribes to the alerter', () => {
      subject.instance().componentDidMount();
      expect(alerter.subscribe).toHaveBeenCalledWith(subject.instance().handleAlert, subject.instance().handleDismiss);
    });

    it('saves the unsubscribe function', () => {
      subject.instance().componentDidMount();

      expect(subject.instance().unsub).toBe(unsub);
    });
  });

  describe('componentWillUnmount', () => {
    let subject;

    beforeEach(() => {
      subject = shallow(<AlertArea />, {disableLifecycleMethods: true});
      subject.instance().componentDidMount();
    });

    it('unsubscribes from the alerter', () => {
      subject.instance().componentWillUnmount();

      expect(unsub).toHaveBeenCalled();
    });

    it('deletes the unsub function', () => {
      subject.instance().componentWillUnmount();

      expect(subject.instance().unsub).not.toBeDefined();
    });
  });

  describe('handleDismiss', () => {
    let subject;
    let instance;
    let alert1;
    let alert2;
    let alert3;

    beforeEach(() => {
      alert1 = {
        id: 1,
        type: 'info',
        channel: 'herp'
      };
      alert2 = {
        id: 2,
        type: 'info',
        channel: 'herp'
      };
      alert3 = {
        id: 3,
        type: 'danger',
        channel: 'errors'
      };

      subject = shallow(<AlertArea />);
      instance = subject.instance();
      instance.handleAlert(alert1);
      instance.handleAlert(alert2);
      instance.handleAlert(alert3);
    });

    it('removes the alert when given an id', () => {
      expect(subject.state().alerts.length).toBe(3);

      instance.handleDismiss({id: alert1.id});

      expect(subject.state().alerts.length).toBe(2);
      expect(subject.state().alerts[0]).toBe(alert2);
    });

    it('removes all alerts when not given an id', () => {
      expect(subject.state().alerts.length).toBe(3);

      instance.handleDismiss({});

      expect(subject.state().alerts.length).toBe(0);
    });

    it('removes all alerts from a given channel if given a channel', () => {
      expect(subject.state().alerts.length).toBe(3);

      instance.handleDismiss({channel: 'herp'});

      expect(subject.state().alerts.length).toBe(1);
      expect(subject.state().alerts[0]).toBe(alert3);
    });
  });

  describe('handleAlert', () => {
    let subject;
    let instance;
    let alert;

    beforeEach(() => {
      alert = {
        id: 1,
        type: 'info',
        channel: 'herp'
      };
    });

    describe('when the AlertArea has no channels', () => {
      beforeEach(() => {
        subject = shallow(<AlertArea />);
        instance = subject.instance();
      });

      it('shows the alert', () => {
        instance.handleAlert(alert);

        expect(subject.state().alerts[0]).toBe(alert);
      });
    });

    describe("when non of the AlertArea's channels match the alert channel", () => {
      beforeEach(() => {
        subject = shallow(<AlertArea channels={['alerts', 'messages', 'flerp']}/>);
        instance = subject.instance();
      });

      it('discards the alert', () => {
        instance.handleAlert(alert);

        expect(subject.state().alerts.length).toBe(0);
      });
    });

    describe("when the AlertArea has the channel for the alert", () => {
      beforeEach(() => {
        subject = shallow(<AlertArea channels={['alerts', 'messages', 'herp']}/>);
        instance = subject.instance();
      });

      it('shows the alert', () => {
        instance.handleAlert(alert);

        expect(subject.state().alerts[0]).toBe(alert);
      });
    });
  });
});