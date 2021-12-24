import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button');
const currentDate = Date.now();
let initDate = null;
let timer = null;

const inputDateEl = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

startBtn.addEventListener('click', onBtnStart);
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    initDate = selectedDates[0];
    if (initDate > currentDate) {
      startBtn.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
};

const flatpickrCalendar = flatpickr(inputDateEl, options);

function onBtnStart() {
  timer = setInterval(() => {
    const currentDate = Date.now();
    let resultTime = initDate - currentDate;
    daysEl.textContent = addLeadingZero(convertMs(resultTime).days);
    hoursEl.textContent = addLeadingZero(convertMs(resultTime).hours);
    minutesEl.textContent = addLeadingZero(convertMs(resultTime).minutes);
    secondsEl.textContent = addLeadingZero(convertMs(resultTime).seconds);
    flatpickrCalendar.input.setAttribute('disabled', 'disabled');

    if (resultTime < 1000) {
      clearInterval(timer);
      flatpickrCalendar.input.removeAttribute('disabled');
      Notify.success('Timer is finish!');
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = (Math.floor(ms / day));
  const hours = (Math.floor((ms % day) / hour));
  const minutes = (Math.floor(((ms % day) % hour) / minute));
  const seconds = (Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }