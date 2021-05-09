import { uuidv4 } from '/packages/uuid/uuid.js';
import { initializeAttributes } from '/packages/models/attributes.js';

export const EMBLEM_ATTRIBUTES = {
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

export const DEFAULT_EMBLEMS = [
  {
    name: 'Local',
    matchers: [
      { host: '127.0.0.1' },
      { host: 'localhost' }
    ]
  }
];

export class Emblem {
  constructor(attributes = {}) {
    initializeAttributes(this, EMBLEM_ATTRIBUTES, attributes);
  }
}