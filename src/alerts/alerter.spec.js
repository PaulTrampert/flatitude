import {Alerter} from './alerter.js';

describe('Alerter', () => {
  let alertEvents;
  let alertEventsUnsub;
  let dismissEvents;
  let dismissEventsUnsub;
  let subject;

  beforeEach(() => {
    alertEventsUnsub = jasmine.createSpy('alertEventUnsub');
    dismissEventsUnsub = jasmine.createSpy('dismissEventsUnsub');
    alertEvents = jasmine.createSpyObj('events', ['publish', 'subscribe']);
    alertEvents.subscribe.and.returnValue(alertEventsUnsub);
    dismissEvents = jasmine.createSpyObj('events', ['publish', 'subscribe']);
    dismissEvents.subscribe.and.returnValue(dismissEventsUnsub);
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
      subject.dismiss(1);

      expect(dismissEvents.publish).toHaveBeenCalledWith({id: 1});
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
      expect(unsubscribe).toEqual(jasmine.any(Function));
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