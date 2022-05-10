export default class CounterPage {
  $target;
  #state;

  constructor($target: string) {
    this.$target = $target;
    this.#state = { count: 0 };
    this.render();
    this.setEvent();
  }

  setState(newState: ObjectType) {
    this.cleanup();
    this.#state = { ...this.#state, ...newState };
    this.render();
    this.setEvent();
  }

  template() {
    return `<button class="plus">plus</button><span>${this.#state.count}</span><button class="minus">minus</button>`;
  }

  render() {
    qs(this.$target).insertAdjacentHTML('beforeend', this.template());
    this.mountChild();
  }

  mountChild() {}

  setEvent() {
    this.addEvent('.plus', 'click', () => {
      this.setState({ count: this.#state.count + 1 });
    });
    this.addEvent('.minus', 'click', () => {
      this.setState({ count: this.#state.count - 1 });
    });
  }

  addEvent(target: string, eventType: string, callback: () => void) {
    if (!qs(target)) throw 'no element found';
    qs(target).addEventListener(eventType, callback);
  }

  cleanup() {
    qs('#root').replaceChildren();
  }
}

interface ObjectType {
  count: number;
}

function qs(selector: string, scope = document): HTMLElement {
  if (!selector) throw 'no selector';
  return scope.querySelector(selector) as HTMLElement;
}
