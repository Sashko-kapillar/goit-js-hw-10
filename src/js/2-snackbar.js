import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css'; // Стилі для iziToast

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault(); // Заборона поведінки замвчування

  const formData = new FormData(event.target);
  const delay = formData.get('delay');
  const state = formData.get('state');

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay); // Виконуємо проміс успішно
      } else {
        reject(delay); // Відхиляємо проміс
      }
    }, delay);
  });

  promise
    .then(delay => {
      // відображення успішного проміса
      iziToast.show({
        title: 'Congratulations',
        message: `✅ Fulfilled promise in ${delay}ms`,
        color: 'green',
        position: 'topCenter',
      });
    })
    .catch(delay => {
      // відображення відхиленого проміса
      iziToast.show({
        title: 'Oops - mistake',
        message: `❌ Rejected promise in ${delay}ms`,
        color: 'red',
        position: 'topCenter',
      });
    });
  form.reset();
});
const formData = document.querySelector('.form');
const formBtn = document.querySelector('button');
const fieldset = document.querySelector('fieldset');
const title = document.querySelector('h1');
const formLabel = document.querySelector('label');
const formInput = document.querySelector('input');

formLabel.style.display = 'flex';
formLabel.style.flexDirection = 'column';

formBtn.style.width = '360px';
formBtn.style.marginTop = '24px';
formBtn.style.padding = '10px';
formBtn.style.color = '#FFF';
formBtn.style.border = 'none';
formBtn.style.borderRadius = '4px';

formData.style.marginLeft = '60px';
formData.style.width = '360px';
title.style.marginBottom = '60px';
formInput.style.padding = '10px';
fieldset.style.margin = '0';
