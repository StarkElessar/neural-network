import { body, lockPaddingElements, pageWrapper } from './elementsNodeList';
/**
* Универсальная функция для блокировки скрола при открытии модальных окон
* При открытии модального окна вызываем: toggleBodyLock(true)
* При закрытии окна вызываем: toggleBodyLock(false)

* lockPaddingElements - это коллекция элементов с фиксированной позицией
* В html таким элементам нужно дать атрибут [data-lp]
*/
const toggleBodyLock = (isLock) => {
  const lockPaddingValue = window.innerWidth - pageWrapper.offsetWidth;

  setTimeout(
    () => {
      lockPaddingElements.forEach((element) => {
        element.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px';
        element.style.transition = isLock ? 'unset' : '';
      });

      body.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px';
      body.classList.toggle('lock', isLock);
    },
    isLock ? 0 : 500
  );
};

export default toggleBodyLock;
