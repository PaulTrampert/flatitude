import EventBroker from '../util/EventBroker.js';

class Alerter {
  constructor(alertEvents, dismissEvents) {
    this.alertEvents = alertEvents || new EventBroker('alertEvents');
    this.dismissEvents = dismissEvents || new EventBroker('dismissEvents');
    this.nextId = 1;
  }

  alert = ({message, type, channel, actions}) => {
    let alertMessage = {
      id: this.nextId++,
      message,
      type,
      channel,
      actions
    };

    this.alertEvents.publish(alertMessage);
  }

  dismiss = (id) => {
    this.dismissEvents.publish({id});
  }

  subscribe = (alertHandler, dismissHandler) => {
    let alertUnsub = this.alertEvents.subscribe(alertHandler);
    let dismissUnsub = this.dismissEvents.subscribe(dismissHandler);
    return () => {
      alertUnsub();
      dismissUnsub();
    };
  }
}

const instance = new Alerter();

export {
  instance as default,
  Alerter
};