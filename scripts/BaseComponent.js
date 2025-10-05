class BaseComponent {
  constructor() {
    if (this.constructor === BaseComponent) {
      throw new Error('The examplar of BaseComponent cannot be created');
    }
  }

  getProxyState(initialState) {
    return new Proxy(initialState, {
      get: (target, prop) => {
        return target[prop];
      },
      set: (target, prop, newValue) => {
        const oldValue = target[prop];
        target[prop] = newValue;

        if (newValue !== oldValue) {
          this.updateUI();
        }

        return true;
      },
    });
  }

  /*
   * Redraw UI in response to change of the state
   */
  updateUI() {
    throw new Error('updateUI() is not implemented');
  }
}

export default BaseComponent;
