import {Alerter} from './alerter.js';

describe('Alerter', () => {
  let alertEvents;
  let alertEventsUnsub;
  let dismissEvents;
  let dismissEventsUnsub;
  let subject;

  beforeEach(() => {
    alertEventsUnsub = jest.fn();
    dismissEventsUnsub = jest.fn();
    alertEvents = {
      'publish': jest.fn(),
      'subscribe': jest.fn()
    };
    alertEvents.subscribe.mockReturnValue(alertEventsUnsub);
    dismissEvents = {
      'publish': jest.fn(),
      'subscribe': jest.fn()
    };
    dismissEvents.subscribe.mockReturnValue(dismissEventsUnsub);
    subject = new Alerter(alertEvents, dismissEvents);
  });

  describe('alert', () => {
    it('publishes the alert event', () => {
      subject.alert({
        message: 'herp',
        type: 'info',
        channel: 'global',
        actions: []
      });

      expect(alertEvents.publish).toHaveBeenCalledWith({
        id: 1,
        message: 'herp',
        type: 'info',
        channel: 'global',
        actions: []
      });
    });

    it('increments nextId', () => {
      subject.alert({
        message: 'herp',
        type: 'info',
        channel: 'global',
        actions: []
      });

      expect(subject.nextId).toBe(2);
    });
  });

  describe('dismiss', () => {
    it('publishes the dismiss event', () => {
      subject.dismiss(1, 'any');

      expect(dismissEvents.publish).toHaveBeenCalledWith({id: 1, channel: 'any'});
    });
  });

  describe('subscribe', () => {
    let unsubscribe;
    let alertHandler;
    let dismissHandler;

    beforeEach(() => {
      alertHandler = () => {};
      dismissHandler = () => {};
      unsubscribe = subject.subscribe(alertHandler, dismissHandler);
    });

    it('subscribes to alertEvents', () => {
      expect(alertEvents.subscribe).toHaveBeenCalledWith(alertHandler);
    });

    it('subscribes to dismissEvents', () => {
      expect(dismissEvents.subscribe).toHaveBeenCalledWith(dismissHandler);
    });

    it('returns an unsubscribe function', () => {
      expect(unsubscribe).toEqual(expect.any(Function));
    });

    describe('the unsubscribe function', () => {
      it('unsubscribes from alertEvents', () => {
        unsubscribe();
        expect(alertEventsUnsub).toHaveBeenCalled();
      });

      it('unsubscribes from dismissEvents', () => {
        unsubscribe();
        expect(dismissEventsUnsub).toHaveBeenCalled();
      });
    });
  });
});