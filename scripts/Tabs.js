import BaseComponent from './BaseComponent.js';

const rootSelector = '[data-js-tabs]';

class Tabs extends BaseComponent {
  selectors = {
    root: rootSelector,
    button: '[data-js-tabs-button]',
    content: '[data-js-tabs-content]',
  };

  stateClasses = {
    isActive: 'is-active',
  };

  stateAttributes = {
    ariaSelected: 'aria-selcted',
    tabIndex: 'tabindex',
  };

  constructor(rootElemenet) {
    super();
    this.rootElement = rootElemenet;
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button);
    this.contentElements = this.rootElement.querySelectorAll(this.selectors.content);
    this.state = this.getProxyState({
      activeTabIndex: [...this.buttonElements].findIndex(button =>
        button.classList.contains(this.stateClasses.isActive)
      ),
    });
    this.limitTabsIndex = this.buttonElements.length - 1;
    this.bindEvents();
  }

  updateUI() {
    const { activeTabIndex } = this.state;
    this.buttonElements.forEach((button, index) => {
      const isActive = activeTabIndex === index;
      button.classList.toggle(this.stateClasses.isActive, isActive);
    });

    this.contentElements.forEach((contentElement, index) => {
      const isActive = activeTabIndex === index;
      contentElement.classList.toggle(this.stateClasses.isActive, isActive);
    });
  }

  onButtonClick(buttonIndex) {
    this.state.activeTabIndex = buttonIndex;
    // this.updateUI();
  }

  activateTab = newTabIndex => {
    this.state.activeTabIndex = newTabIndex;
    this.buttonElements[newTabIndex].focus();
    // this.updateUI();
  };

  previousTab = () => {
    const newTabIndex =
      this.state.activeTabIndex === 0 ? this.limitTabsIndex : this.state.activeTabIndex - 1;
    this.activateTab(newTabIndex);
  };

  nextTab = () => {
    const newTabIndex =
      this.state.activeTabIndex === this.limitTabsIndex ? 0 : this.state.activeTabIndex + 1;
    this.activateTab(newTabIndex);
  };

  firstTab = () => {
    this.activateTab(0);
  };

  lastTab = () => {
    this.activateTab(this.limitTabsIndex);
  };

  onKeyDown = event => {
    const { code, metaKey } = event;
    event.preventDefault();

    const action = {
      ArrowLeft: this.previousTab,
      ArrowRight: this.nextTab,
      Home: this.firstTab,
      End: this.lastTab,
    }[code];

    const isMacHomeKey = metaKey && code === 'ArrowLeft';

    if (isMacHomeKey) {
      this.firstTab();
      return;
    }

    const isMacEndKey = metaKey && code === 'ArrowRight';

    if (isMacHomeKey) {
      this.lastTab();
      return;
    }

    action?.();
  };

  bindEvents() {
    this.buttonElements.forEach((button, index) =>
      button.addEventListener('click', () => {
        this.onButtonClick(index);
      })
    );

    this.rootElement.addEventListener('keydown', this.onKeyDown);
  }
}

class TabsCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach(elem => new Tabs(elem));
  }
}

export default TabsCollection;
