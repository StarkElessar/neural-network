/*
 !(i)
 Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 Или когда импортирован весь файл, например import "files/script.js";
 Неиспользуемый (не вызванный) код в итоговый файл не попадает.

 Если мы хотим добавить модуль следует его раскомментировать
 */
import Inputmask from 'inputmask/lib/inputmask.js';
import { isWebp, headerFixed, menuInit } from './modules';

import Accordion from './modules/Accordion.js';
import Tabs from './modules/Tabs.js';
import ScrollToTopButton from './modules/ScrollToTopButton.js';
import TextareaHeightAuto from './modules/TextareaHeightAuto.js';
import FormSubmit from './modules/FormSubmit.js';

/* Раскомментировать для использования */
// import { MousePRLX } from './libs/parallaxMouse';

/* Раскомментировать для использования */
// import AOS from 'aos';

/* Раскомментировать для использования */
// import Swiper, { Navigation, Pagination } from 'swiper';

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML
 ! (i) необходимо для корректного отображения webp из css
 */
isWebp();
/* Добавление класса touch для HTML если браузер мобильный */
/* Раскомментировать для использования */
// addTouchClass();
/* Добавление loaded для HTML после полной загрузки страницы */
/* Раскомментировать для использования */
// addLoadedClass();
/* Модуль для работы с меню (Бургер) */
/* Раскомментировать для использования */
menuInit();

/* Библиотека для анимаций ===============================================================================
 *  документация: https://michalsnik.github.io/aos
 */
// AOS.init();
// =======================================================================================================

// Паралакс мышей ========================================================================================
// const mousePrlx = new MousePRLX({});
// =======================================================================================================

// Фиксированный header ==================================================================================
headerFixed();
// =======================================================================================================

/* Открытие/закрытие модальных окон ======================================================================
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * И на кнопку, которая вызывает окно так же повешай атрибут data-type="<название окна>"

 * На обертку(враппер) окна добавь класс _overlay-bg
 * На кнопку для закрытия окна добавь класс button-close
 */
/* Раскомментировать для использования */
// togglePopupWindows();
// =======================================================================================================
new Accordion('.accordion', {
  shouldOpenAll: false,
  defaultOpen: [0],
});

new FormSubmit('.contact-form', {
  token:
    document.querySelector('input[name="csrfmiddlewaretoken"]')?.value || '',
});

new Tabs('cases');
new TextareaHeightAuto('.contact-form__textarea');
new ScrollToTopButton('.to-top');
new Inputmask('+375 (99) 999-99-99').mask(
  document.querySelectorAll('input[type="tel"]')
);

window.addEventListener('load', () => {
  document.documentElement.classList.add('loaded');
});
