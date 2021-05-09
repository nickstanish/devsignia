import {
  capitalize,
  stripWhitespace,
} from '/packages/utils/string.js';
import { valueOf } from '/packages/utils/template.js';

export const initializeAttributes = (context, attributes, values) => {
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