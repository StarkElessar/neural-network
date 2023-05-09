class ScrollToTopButton {
  constructor(selector) {
    this.button = document.querySelector(selector);
    this.addButtonClickListener();
  }

  addButtonClickListener() {
    this.button.addEventListener('click', this.scrollToTop);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

export default ScrollToTopButton;