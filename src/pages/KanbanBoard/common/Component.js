import { qs } from '@/pages/KanbanBoard/utils/helper';

export default class Component {
  $target;
  $state;
  constructor($target, $state) {
    this.$target = $target;
    this.$state = $state;
    this.render();
    this.setEvent();
    this.setUp();
  }

  template() {}

  render() {
    qs(this.$target).insertAdjacentHTML('beforeend', this.template());
    this.mountChild();
  }

  mountChild() {}

  cleanup() {}

  setUp() {}

  setEvent() {}
}
