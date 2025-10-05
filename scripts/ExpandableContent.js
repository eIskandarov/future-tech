import pxToRem from './utils/pxToRem.js';

const rootSelector = '[data-js-expandable-content]';

class ExpandableContent {
  selectors = {
    root: rootSelector,
    button: '[data-js-expandable-content-button]',
  };

  stateClasses = {
    isExpanded: 'is-expanded',
  };

  animationParams = {
    duration: 500,
    easy: 'ease',
  };

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.buttonElement = this.rootElement.querySelector(this.selectors.button);
    this.bindEvents();
  }

  expand() {
    const { offsetHeight, scrollHeight } = this.rootElement;

    const isEpanding = this.rootElement.classList.toggle(this.stateClasses.isExpanded);
    let animation = [];

    isEpanding
      ? (animation = [
        { maxHeight: `${pxToRem(offsetHeight)}rem` },
        { maxHeight: `${pxToRem(scrollHeight)}rem` },
      ])
      : (animation = [
        { maxHeight: `${pxToRem(scrollHeight)}rem` },
        { maxHeight: `${pxToRem(offsetHeight)}rem` },
      ]);

    this.rootElement.animate(animation, this.animationParams);
  }

  onButtonClick = () => {
    this.expand();
  };

  bindEvents() {
    this.buttonElement.addEventListener('click', this.onButtonClick);
  }
}

class ExpandableContentCollection {
  constructor() {
    this.init();
  }

  init() {
    document
      .querySelectorAll(rootSelector)
      .forEach(expendableContentElement => new ExpandableContent(expendableContentElement));
  }
}

export default ExpandableContentCollection;
