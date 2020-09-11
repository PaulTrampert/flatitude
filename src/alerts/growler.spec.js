import {Growler} from './growler.js';

describe('Growler', () => {
  let events;
  let subject;
  let unsub;

  beforeEach(() => {
    events = {
      publish: jest.fn(),
      subscribe: jest.fn(() => unsub)
    };

    subject = new Growler(events);
  });

  describe('growl', () => {
    let arg;

    beforeEach(() => {
      arg = {
        type: 'info',
        message: 'hi',
        onDismiss: jest.fn()
      };
    });

    it('calls events.publish', () => {
      subject.growl(arg);
      expect(events.publish).toHaveBeenCalledWith({
        type: 'info',
        message: 'hi',
        onDismiss: arg.onDismiss,
        id: 0
      });
    });

    it('increments nextId', () => {
      subject.growl(arg);
      expect(subject.nextId).toBe(1);
    });
  });

  describe('subscribe', () => {
    let handler;

    beforeEach(() => {
      unsub = jest.fn();
      handler = jest.fn();
    });

    it('calls events.subscribe with the handler', () => {
      subject.subscribe(handler);

      expect(events.subscribe).toHaveBeenCalledWith(handler);
    });

    it('returns the unsubscribe function', () => {
      expect(subject.subscribe(handler)).toBe(unsub);
    });
  });
});