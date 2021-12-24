import { qs } from '@/utils/helper';

export default class Component {
  $target;
  $state;
  constructor($target, $state) {
    this.$target = $target;
    this.setInitialState($state);
    this.render();
    this.renderChildren();
    this.setEvent();
  }

  setInitialState(state) {
    this.$state = state;
  }

  template() {}

  render() {
    qs(this.$target).insertAdjacentHTML('beforeend', this.template());
  }

  renderChildren() {}

  setEvent() {}
}
