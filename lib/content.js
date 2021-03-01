const HOSTS = [
  '127.0.0.1',
  'localhost'
];

const NAMESPACE = 'com_nickstanish_devsignia';
const CSS = `
.${NAMESPACE}-ribbon-container {
  box-sizing: border-box;
  font-size: 16px;
  height: 10em;
  line-height: 1;
  overflow: hidden;
  pointer-events: none;
  position: fixed;
  right: 0;
  top: 0;
  user-select: none;
  width: 10em;
  z-index: 9999;
}

.${NAMESPACE}-ribbon {
  background-color: #336699;
  box-shadow: 0px 0px 4px #2F4858;
  color: #f1f1f1;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: 900;
  left: -1em;
  padding: 0.4em 0;
  position: absolute;
  text-align: center;
  text-transform: uppercase;
  top: 3em;
  transform: rotate(45deg);
  width: 14em;
}`;

const insertCSS = () => {
  const style = document.createElement('style');
  style.innerHTML = CSS;
  document.head.appendChild(style);
};

const insertRibbon = (label) => {
  const container = document.createElement('div');
  container.classList.add(`${NAMESPACE}-ribbon-container`);

  const ribbon = document.createElement('div');
  ribbon.classList.add(`${NAMESPACE}-ribbon`);
  ribbon.innerText = label;

  container.appendChild(ribbon);
  document.body.appendChild(container);
};

const isMatch = () => {
  return HOSTS.some((item) => {
    return item === window.location.hostname;
  });
};

if (isMatch()) {
  insertCSS();
  insertRibbon('DEV BUILD');
}
