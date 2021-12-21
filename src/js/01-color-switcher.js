const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnClose: document.querySelector('button[data-stop]'),
  background: document.querySelector('body'),
};

let timerId = null;

refs.btnStart.addEventListener('click', onStartClick);
refs.btnClose.addEventListener('click', onCloseClick);

function onStartClick() {
  timerId = setInterval(() => {
    refs.background.style.background = getRandomHexColor();
  }, 1000);

  refs.btnStart.disabled = true;
  refs.btnClose.disabled = false;
}

function onCloseClick() {
  clearInterval(timerId);

  refs.btnClose.disabled = true;
  refs.btnStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
