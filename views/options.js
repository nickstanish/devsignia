import {
  cloneTemplateNode,
  removeAllChildren,
  valueOf
} from '/packages/utils/template.js';
import { Emblem, DEFAULT_EMBLEMS } from '/packages/models/emblem.js';

const getStoredEmblems = () => {
  return [new Emblem(
    DEFAULT_EMBLEMS[0]
  )];
}

const EMBLEM_LIST_ID = 'view-emblem-list';
const EMBLEM_VIEW_TEMPLATE_ID = 'template-view-emblem';

const emblemListElement = document.getElementById(EMBLEM_LIST_ID);
const emblemViewTemplate = document.getElementById(EMBLEM_VIEW_TEMPLATE_ID);

removeAllChildren(emblemListElement);
emblemListElement.append(...getStoredEmblems().map(emblem => {
  const element = cloneTemplateNode(emblemViewTemplate);

  [...element.querySelectorAll('[data-text]')].forEach(node => {
    const getter = node.getAttribute('data-text');
    node.removeAttribute('data-text');
    const value = valueOf(emblem[getter]);
    node.innerText = value;
  });

  [...element.querySelectorAll('[data-attr]')].forEach(node => {
    const parts = node.getAttribute('data-attr');
    node.removeAttribute('data-attr');
    const { attr, getter } = parts.match(/\[(?<attr>.*)\]:(?<getter>.*)/).groups;
    const value = valueOf(emblem[getter]);
    node.setAttribute(attr, value);
  });

  return element;
}));