export class EventEmitter {
  constructor() {
    this._events = {};
  }

  addEventListener(event, fn) {
    if (!(event in this._events)) {
      this._events[event] = [];
    }
    this._events[event].push(fn);
    return () => this.removeAllEventListener(event, fn);
  }

  removeEventListener(event, fn) {
    if (event in this._events) {
      const index = this._events[event].indexOf(fn);
      if (index >= 0) {
        this._events[event].splice(index, 1);
      }
    }
  }

  removeAllEventListeners() {
    Object.keys(this._events).forEach((event) => {
      this._events[event].length = 0;
    });
  }

  emit(event, eventData) {
    if (event in this._events) {
      const payload = {
        name: event,
        value: eventData
      };
      this._events[event].forEach((fn) => fn(payload))
    }
  }
}