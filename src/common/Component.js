import { qs } from '@/utils/helper';

export default class Component {
  $target;
  $state;
  constructor($target, $state) {
    this.$target = $target;
    this.$state = $state;
    this.render();
    this.setEvent();
  }

  template() {}

  render() {
    qs(this.$target).innerHTML = this.template();
  }

  setEvent() {}
}
