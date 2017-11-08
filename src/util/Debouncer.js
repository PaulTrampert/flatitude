import delay from './delay.js';

class Debouncer {
  constructor(defaultTimeout = 250) {
    this.defaultTimeout = defaultTimeout;
    this.idx = 0;
  }

  cancel() {
    this.idx++;
  }

  debounce = async (f, timeout = this.defaultTimeout) => {
    let idx = ++this.idx;
    await delay(timeout);
    if (idx === this.idx) {
      let result = await f();
      if (idx === this.idx) {
        return result;
      }
    }
    throw new Debounce();
  }

  swallowDebounce(error) {
    if (error instanceof Debounce) {
      return;
    }
    throw error;
  }
}

class Debounce {

}

export default Debouncer;