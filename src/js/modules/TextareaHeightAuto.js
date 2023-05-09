class TextareaHeightAuto {
  options = {
    currentHeight: 120,
    overflowY: 'hidden',
  };

  constructor(element, options = {}) {
    this.options = Object.assign(this.options, options);
    this.textarea = document.querySelector(element);

    console.log(this.options);

    if (this.textarea) {
      this.textarea.style.height = `${this.options.currentHeight}px`;
      this.textarea.style.overflowY = this.options.overflowY;

      this.textarea.addEventListener(
        'input',
        this.handleKeyup.bind(this),
        false
      );
    }
  }

  handleKeyup({ target }) {
    this.textarea.style.height = `${this.options.currentHeight}px`;
    this.textarea.style.height = `${target.scrollHeight}px`;
  }
}

export default TextareaHeightAuto;