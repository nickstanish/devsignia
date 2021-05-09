export const capitalize = (str) => str.replace(/^\w/, c => c.toUpperCase());
export const stripWhitespace = (str) => str.replace(/\W+/g, '');