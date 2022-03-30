import { qs } from '@/utils/helper';
import '@/components/Entry/index.scss';

interface EntryPropType {
  pathname: string[];
}

export default class Entry {
  $target;
  props;

  constructor($target: string, props: EntryPropType) {
    this.$target = $target;
    this.props = props.pathname || [];
    this.render();
  }

  template() {
    return `
    <div class="entry__container">
      <h2>SPA</h2>
      ${this.props?.map(
        (pathName) => `
        <article class="entry__item">
          <p>${pathName}</p>
        </article>
      `,
      )}
    </div>
    `;
  }

  render() {
    qs(this.$target).insertAdjacentHTML('beforeend', this.template());
  }

  setEvent() {
    document.addEventListener('click', (e) => {
      console.log(e);
    });
  }

  removeEventListener() {}
}
