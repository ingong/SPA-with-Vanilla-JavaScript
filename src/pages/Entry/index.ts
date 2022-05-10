import '@/pages/Entry/index.scss';
import { movePage } from '@/routes';

interface EntryPropType {
  children: Array<{ name: string; route: string }>;
}

export default class Entry {
  $target;
  props;

  constructor($target: string, props: EntryPropType) {
    this.$target = $target;
    this.props = props.children || [];
    this.render();
    this.setEvent();
  }

  template() {
    return `
    <div class="entry__container">
      <h2>SPA</h2>
      ${this.props?.map(
        (path) => `
        <article class="entry__item" data-route=${path.route}>
          <p>${path.name}</p>
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
    qs('.entry__container').addEventListener('click', (e: MouseEvent) => handleClick(e));

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closestTarget = target.closest('article');
      if (!closestTarget) return;
      const { route } = closestTarget.dataset;
      qs('.entry__container').removeEventListener('click', (e: MouseEvent) => handleClick(e));
      movePage(route);
    };
  }
}

function qs(selector: string, scope = document): HTMLElement {
  if (!selector) throw 'no selector';
  return scope.querySelector(selector) as HTMLElement;
}
