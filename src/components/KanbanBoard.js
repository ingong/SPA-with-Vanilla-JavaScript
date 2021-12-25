import Component from '@/common/Component';
import { qs } from '@/utils/helper';
import KanbanColumn from '@/components/KanbanColumn';
import Modal from '@/common/Modal';
import { store, storeInit } from '@/store/index';
import '@/style/kanban.css';

export default class KanbanBoard extends Component {
  template() {
    return `
      <main>
        <h1>칸반 보드</h1>
        <section class="kanban-container">
        </section>
      </main>
    `;
  }

  cleanUpChildren() {
    qs('.kanban-container').innerHTML = '';
  }

  renderChildren() {
    ['TODO', 'IN_PROGRESS', 'DONE'].map(
      (value) =>
        new KanbanColumn('.kanban-container', {
          name: value,
          list: store.getState()?.filter((v) => v.status === value),
        }),
    );
    new Modal('.kanban-container');
  }

  setUp() {
    store.subscribe(this.cleanUpChildren.bind(this));
    store.subscribe(this.renderChildren.bind(this));
    storeInit();
  }
}
