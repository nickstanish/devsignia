export const valueOf = (value) => {
  if (typeof value === 'function') {
    return value();
  }
  return value;
};

export const removeAllChildren = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

export const cloneTemplateNode = (templateNode) => {
  return templateNode.content.cloneNode(true);
};