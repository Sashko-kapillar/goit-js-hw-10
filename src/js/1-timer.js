import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css'; // Стилі для flatpickr
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css'; // Стилі для iziToast

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
      userSelectedDate = null;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};

const flatpickrInstance = flatpickr('#datetime-picker', options);

const startBtn = document.querySelector('[data-start]');
let userSelectedDate = null;
let timerId = null;

startBtn.addEventListener('click', () => {
  if (!userSelectedDate) {
    return;
  }

  startBtn.disabled = true;
  flatpickrInstance.disabledDate = () => true; // Блокуємо вибір дати під час відліку

  timerId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = userSelectedDate - currentTime;

    if (deltaTime <= 0) {
      clearInterval(timerId);
      timerId = null;
      startBtn.disabled = false;
      flatpickrInstance.disabledDate = () => false;
      // Відобразити повідомлення про завершення відліку
      iziToast.success({
        title: 'Success',
        message: 'Countdown finished!',
        position: 'topRight',
      });
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    document.querySelector('[data-days]').textContent = days
      .toString()
      .padStart(2, '0');
    // Аналогічно для інших полів
  }, 1000);
});
