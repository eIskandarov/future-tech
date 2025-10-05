const rootSelector = '[data-js-input-mask]';

class InputMask {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.init();
  }

  init() {
    const isLibReady = typeof window.IMask !== 'undefined';

    if (!isLibReady) {
      console.error('IMask Lib is not available');
      return;
    }

    window.IMask(this.rootElement, this.rootElement.dataset.jsInputMask);
  }
}

class InputMaskCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach(elem => new InputMask(elem));
  }
}

export default InputMaskCollection;
