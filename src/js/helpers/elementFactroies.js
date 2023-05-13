import toggleBodyLock from './toggleBodyLock.js';

// Данная функция записывает переданные атрибуты для переданного элемента:
const setAttributes = (element, attributes) => {
  return Object.keys(attributes).forEach((key) =>
    element.setAttribute(key, attributes[key])
  );
};

// Объединяем все свойства элемента в один объект
const setProps = (element, props) => Object.assign(element, props);

// Базовое создание элемента, куда можно передать его тип, атрибуты, детей и остальные свойства
const createElement = ({
  typeElement,
  attributes,
  children = [],
  ...props
}) => {
  const element = document.createElement(typeElement);

  setAttributes(element, attributes);
  setProps(element, props);
  element.append(...children);

  return element;
};

const createModalInfo = ({
  id = '',
  textMessage = 'Сообщение успешно отправлено',
  isError = false,
} = {}) => {
  const button = createElement({
    typeElement: 'button',
    attributes: {
      class: 'modal-info__button',
      type: 'button',
    },
    textContent: 'Закрыть окно',
    onclick: ({ target }) => {
      const modal = target.closest(`#${id}`);

      modal.classList.remove('_is-open');
      toggleBodyLock(false);
    },
  });

  const textElement = createElement({
    typeElement: 'p',
    attributes: {
      class: 'modal-info__text',
    },
    textContent: textMessage,
  });

  const icon = createElement({
    typeElement: 'div',
    attributes: {
      class: `modal-info__icon ${isError ? '_error' : '_success'}`,
    },
    innerHTML: isError
      ? `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
      </svg>`
      : `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
      </svg>`,
  });

  const body = createElement({
    typeElement: 'div',
    attributes: {
      class: 'modal-info__body',
    },
    children: [textElement, icon, button],
  });

  return createElement({
    typeElement: 'div',
    attributes: {
      class: 'modal-info _overlay-bg _is-open',
      id: id,
      role: 'dialog',
      tabindex: -1,
    },
    children: [body],
    onclick: (event) => {
      console.log(event);
    },
  });
};

export { createModalInfo };