import Component from '@/common/Component';
import { qs, getNewDateString } from '@/utils/helper';
import { getMaxOrder } from '@/utils/board';
import KanbanColumn from '@/components/KanbanColumn';
import { store, updateItem } from '@/store';
import localDB from '@/db';
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
  }
}

const handleDropinColumn = ({ id, status }, itemList) => {
  if (id !== 'column') return;

  const useRefSelector = qs('.useRef');
  const dragItem = itemList.find((v) => v.id === useRefSelector.dataset.id);
  const order = getMaxOrder(itemList, status) + 1;

  const toBeChangeItem = { ...dragItem, status, order, lastModifiedTime: getNewDateString() };
  store.dispatch(updateItem(toBeChangeItem));
  localDB.set(toBeChangeItem.id, toBeChangeItem);
};
