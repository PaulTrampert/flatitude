import EventBroker from "../util/EventBroker.js";

class Growler {
  constructor(events) {
    this.events = events || new EventBroker('growler');
    this.nextId = 0;
  }

  growl = ({type, message, onDismiss}) => {
    this.events.publish({
      id: this.nextId,
      type,
      message,
      onDismiss: onDismiss || (() => {})
    });
    this.nextId++;
  }

  subscribe = (handler) => {
    return this.events.subscribe(handler);
  }
}

const instance = new Growler();

export {
  instance as default,
  Growler
};