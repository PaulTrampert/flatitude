import EventBroker from '../util/EventBroker.js';

class FormContext {
  constructor(name) {
    this.name = name;
    this.hasSubmitted = false;
    this.isSubmitting = false;
    this.fields = [];
    this.submitEvents = new EventBroker(`${name} Submit Events`);
  }

  async isValid() { 
    let promises = this.fields.map(async field => {
      if (field.state.needsValidation) {
        return await field.validate();
      }
      return field.state.validationErrors.length === 0;
    }); 
    let results = await Promise.all(promises);
    return results.every(result => result);
  }

  subscribeToSubmitEvents(handler) {
    return this.submitEvents.subscribe(handler);
  }

  beginSubmit() {
    this.isSubmitting = true;
    this.submitEvents.publish(this);
  }

  endSubmit() {
    this.isSubmitting = false;
    this.hasSubmitted = true;
    this.submitEvents.publish(this);
  }

  registerField(field) {
    this.fields.push(field);
  }
}

FormContext.BeginSubmit = 'BeginSubmit';
FormContext.EndSubmit = 'EndSubmit';

export default FormContext;