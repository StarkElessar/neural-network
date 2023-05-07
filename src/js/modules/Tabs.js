/**
 * @class Tabs
 * @description Represents a tabs component.
 * @param {string} selector - The CSS selector for the tabs container.
 */
class Tabs {
  /**
   * Create a Tabs.
   * @param {string} selector - The CSS selector for the tabs container.
   * @param {object} options - The options for configuring the tabs.
   */
  constructor(selector, options = {}) {
    this.tabsContainers = document.querySelectorAll(selector);
    this.defaultTab = options.defaultTab || 0;

    this.init();
    this.handleHashChange();
  }

  /**
   * Initialize the tabs.
   */
  init() {
    this.tabsContainers.forEach((tabsContainer) => {
      const tabTriggers = tabsContainer.querySelectorAll('[data-tab-trigger]');
      const tabContents = tabsContainer.querySelectorAll('[data-tab-content]');

      tabTriggers.forEach((trigger, index) => {
        trigger.addEventListener('click', (event) => {
          event.preventDefault();
          const target = event.target.closest('[data-tab-trigger]');

          if (!target) return;

          const tabId = target.dataset.tabTrigger;
          this.showTab(tabsContainer, tabId);
          this.updateHash(tabId);
        });

        // Add active class to the default tab trigger
        if (index === this.defaultTab) {
          trigger.classList.add('active');
        }
      });

      // Add active class to the default tab content
      if (tabContents.length) {
        tabContents[this.defaultTab].classList.add('active');
      }
    });
  }

  /**
   * Handle the hash change event.
   */
  handleHashChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);

      this.tabsContainers.forEach((tabsContainer) => {
        const tab = tabsContainer.querySelector(`[data-tab-trigger="${hash}"]`);

        if (tab) {
          const tabId = tab.dataset.tabTrigger;
          this.showTab(tabsContainer, tabId);
        }
      });
    });
  }

  /**
   * Show the specified tab.
   * @param {Element} container - The container element containing the tabs.
   * @param {string} tabId - The ID of the tab to show.
   */
  showTab(container, tabId) {
    const tabTriggers = container.querySelectorAll('[data-tab-trigger]');
    const tabContents = container.querySelectorAll('[data-tab-content]');

    tabTriggers.forEach((trigger) => {
      const isActive = trigger.dataset.tabTrigger === tabId;

      trigger.classList.toggle('active', isActive);
    });

    tabContents.forEach((content) => {
      const contentId = content.dataset.tabContent;
      const isActive = contentId === tabId;

      content.classList.toggle('active', isActive);
    });
  }

  /**
   * Update the hash in the URL.
   * @param {string} tabId - The ID of the current tab.
   */
  updateHash(tabId) {
    window.location.hash = tabId;
  }
}

export default Tabs;