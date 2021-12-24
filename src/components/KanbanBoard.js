import Component from '@/common/Component';
import KanbanColumn from '@/components/KanbanColumn';
import store from '@/store';
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

  renderChildren() {
    ['TODO', 'IN_PROGRESS', 'DONE'].map(
      (value) =>
        new KanbanColumn('.kanban-container', {
          name: value,
          list: this.$state.filter((v) => v.status === value),
        }),
    );
  }

  setInitialState() {
    this.$state = store.getState();
    store.subscribe(this.setState.bind(this));
    store.dispatch({
      type: 'init',
      payload: [
        { status: 'TODO', title: 'a', inChargePerson: 'insong' },
        { status: 'IN_PROGRESS', title: 'b', inChargePerson: 'haeryeong' },
      ],
    });
  }

  setState() {
    this.$state = store.getState() ? store.getState() : [];
  }
}
