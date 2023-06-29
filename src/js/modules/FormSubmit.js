import { createModalInfo } from '../helpers/elementFactroies';
import { body } from '../helpers/elementsNodeList';
import toggleBodyLock from '../helpers/toggleBodyLock.js';

class FormSubmit {
  constructor(selector, options = {}) {
    const defaultOptions = {
      timeToDelete: 3000,
      token: null,
      emailRegex: /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,8})+$/,
      actionEndpoint: '/send_message/',
      errorMessages: {
        missingFormFields: 'Ошибка: отсутствует форма или обязательные поля',
        emptyRequiredFields: 'Заполните обязательные поля',
        genericError: 'Произошла какая-то ошибка',
      },
    };

    this.options = Object.assign(defaultOptions, options);
    this.selector = selector;
    this.form = document.querySelector(selector);
    this.email = this.form.querySelector('._email');
    this.mandatoryInputs = Array.from(this.form.querySelectorAll('._req'));
    this.inputsToValidate = this.mandatoryInputs.concat(this.email);

    this.init();
    this.events();
  }

  init() {
    // Проверка наличия формы и обязательных полей
    if (!this.form || !this.inputsToValidate[0]) {
      console.log(this.options.errorMessages.missingFormFields);
      this.showModal(this.options.errorMessages.missingFormFields);
      return;
    }

    // Дополнительные действия или настройки, если требуется

    // Установка обработчика события отправки формы
    this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
  }

  events() {
    /** Кастомные ивенты, если нужны.. */
  }

  async handleFormSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(this.form);

      if (!this.validateForm) {
        this.form.classList.add('_sending');

        const response = await fetch(this.options.actionEndpoint, {
          method: 'POST',
          headers: { 'X-CSRFToken': this.options.token },
          body: formData,
        });

        const { text_response } = await response.json();

        if (response.ok) {
          this.showModal(text_response, false);
        } else {
          this.showModal(this.options.errorMessages.genericError);
        }
      } else {
        this.showModal(this.options.errorMessages.emptyRequiredFields);
      }
    } catch (error) {
      this.form.classList.remove('_sending');
      this.showModal(this.options.errorMessages.genericError);
    } finally {
      if (!this.validateForm) {
        this.form.reset();
      }

      this.form.classList.remove('_sending');
    }
  }

  get validateForm() {
    let counterError = 0;

    this.inputsToValidate.forEach((input) => {
      this.removeClassError(input);

      const isEmail = input.classList.contains('_email');
      const isEmpty = input.value === '';

      if (isEmail) {
        if (!isEmpty && !this.validateEmail(input)) {
          this.addClassError(input);
          counterError++;
        }
      } else {
        if (isEmpty) {
          this.addClassError(input);
          counterError++;
        }
      }
    });

    return counterError;
  }

  addClassError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  removeClassError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  validateEmail(input) {
    return this.options.emailRegex.test(input.value);
  }

  showModal(message, isError = true) {
    const modal = createModalInfo({
      id: 'modal_info',
      textMessage: message,
      isError,
    });

    body.append(modal);
    toggleBodyLock(true);

    if (modal) {
      setTimeout(() => {
        modal.remove();
        toggleBodyLock(false);
      }, this.options.timeToDelete);
    }
  }
}

export default FormSubmit;
