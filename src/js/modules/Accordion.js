/**
 * @class Accordion
 * @description Represents an accordion component.
 * @param {string} selector - The CSS selector for the accordion container.
 * @param {object} options - The options for configuring the accordion.
 * @param {boolean} options.shouldOpenAll - Whether to keep previous items open or not. Default is false.
 * @param {number[]} options.defaultOpen - The set of initially open items. Default is an empty array.
 */
class Accordion {
  constructor(selector, options = {}) {
    this.shouldOpenAll = options.shouldOpenAll || false;
    this.defaultOpen = options.defaultOpen || [];

    this.accordion = document.querySelector(selector);
    this.accordionItems = this.accordion.querySelectorAll('.accordion__item');

    this.init();
  }

  init() {
    this.accordion.addEventListener('click', ({ target }) => {
      const header = target.closest('.accordion__header');

      if (!header) return;

      const item = header.parentNode;
      this.toggle(item);

      if (item.classList.contains('open') && !this.shouldOpenAll) {
        this.closeOthers(item);
      }
    });

    this.accordionItems.forEach((item, index) => {
      if (this.defaultOpen.includes(index)) {
        this.open(item);
      } else {
        this.close(item);
      }
    });
  }

  toggle(element) {
    element.classList.toggle('open');

    if (this.shouldOpenAll) {
      this.closeOthers(element);
    }
  }

  open(element) {
    element.classList.add('open');
  }

  close(element) {
    element.classList.remove('open');
  }

  closeOthers(currentItem) {
    for (const item of this.accordionItems) {
      if (item !== currentItem && item.classList.contains('open')) {
        this.close(item);
      }
    }
  }
}

export default Accordion;