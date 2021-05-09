const uuidv4 = () => {
  // https://stackoverflow.com/a/2117523
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
const capitalize = (str) => str.replace(/^\w/, c => c.toUpperCase());
const stripWhitespace = (str) => str.replace(/\W+/g, '');
const valueOf = (value) => {
  if (typeof value === 'function') {
    return value();
  }
  return value;
};

const initializeAttributes = (context, attributes, values) => {
  Object.keys(attributes).forEach((attribute) => {
    const privateField = `_${attribute}`;
    const publicName = stripWhitespace(capitalize(attribute));
    context[privateField] = attribute in values ? values[attribute] : valueOf(attributes[attribute].default);

    const getter = `get${publicName}`;
    const setter = `set${publicName}`;
    context[getter] = () => context[privateField];
    context[setter] = (value) => context[privateField] = value;
  });
}

const EMBLEM_ATTRIBUTES = {
  'backgroundColor': {
    default: '#336699'
  },
  'color': {
    default: '#f1f1f1'
  },
  'enabled': {
    default: true
  },
  'id': {
    default: () => uuidv4()
  },
  'matchers': {
    default: []
  },
  'message': {
    default: 'DEV BUILD'
  },
  'name': {
    default: 'Untitled'
  },
};

const DEFAULT_EMBLEMS = [
  {
    name: 'Local',
    matchers: [
      { host: '127.0.0.1' },
      { host: 'localhost' }
    ]
  }
];

class Emblem {
  constructor(attributes = {}) {
    initializeAttributes(this, EMBLEM_ATTRIBUTES, attributes);
  }
}

class EventEmitter {
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
