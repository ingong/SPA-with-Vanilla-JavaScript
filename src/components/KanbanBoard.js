import Component from '@/common/Component';
import { qs } from '@/utils/helper';
import KanbanColumn from '@/components/KanbanColumn';
import { store, storeInit, updateItem } from '@/store/index';
import '@/style/kanban.css';

export default class KanbanBoard extends Component {
  template() {
    return `
      <main>
        <h1>칸반 보드</h1>
        <section class="kanban-container">
        </section>
        <div class="useRef"></div>
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
          list: store
            .getState()
            ?.filter((v) => v.status === value)
            .sort((a, b) => a.order - b.order),
        }),
    );
  }

  setEvent() {
    const kanbanSelector = qs('.kanban-container');
    const useRefSelector = qs('.useRef');

    kanbanSelector.addEventListener('dragstart', (e) => {
      const { id, status } = e.target.dataset;
      useRefSelector.dataset.id = id;
      useRefSelector.dataset.status = status;
    });

    kanbanSelector.addEventListener('drop', (e) =>
      handleDropinColumn(e.target.dataset, store.getState()),
    );

    kanbanSelector.addEventListener('dragover', (e) => e.preventDefault());
  }

  setUp() {
    store.subscribe(this.cleanUpChildren.bind(this));
    store.subscribe(this.renderChildren.bind(this));
    storeInit();
  }
}

const handleDropinColumn = ({ id, status }, itemList) => {
  if (id !== 'column') return;

  const filteredList = itemList.filter((item) => item.status === status);
  const maxOrder = filteredList.length > 0 ? Math.max(...filteredList.map((item) => item.id)) : -1;

  const useRefSelector = qs('.useRef');
  const targetItem = itemList.find((v) => v.id === useRefSelector.dataset.id);

  store.dispatch(updateItem({ ...targetItem, status, order: maxOrder + 1 }));
};
