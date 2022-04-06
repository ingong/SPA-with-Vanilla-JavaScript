import Component from '@/common/Component';
import { qs, getNewDateString } from '@/utils/helper';
import { getMaxOrder } from '@/utils/board';
import KanbanColumn from '@/components/KanbanColumn';
import { store, updateItem } from '@/store';
import EditModal from '@/components/KanbanModal/EditModal';
import localDB from '@/db';
import '@/components/KanbanBoard/kanban.css';

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

  cleanUpChildren() {
    for (const child of [...qs('.kanban-container').children]) child.remove();
  }

  setUp() {
    store.subscribe(this.cleanUpChildren.bind(this));
    store.subscribe(this.renderChildren.bind(this));
  }

  setEvent() {
    const kanbanSelector = qs('.kanban-container');
    kanbanSelector.addEventListener('click', ({ target }) => {
      target.closest('.add-btn') && this.handleAddBtnClick();
    });
    kanbanSelector.addEventListener('dragstart', ({ target }) => this.handleRefSelector(target));
    kanbanSelector.addEventListener(
      'drop',
      ({ target }) => target.dataset.id === 'column' && this.handleDropinColumn(target.dataset, store.getState()),
    );
    kanbanSelector.addEventListener('dragover', (e) => e.preventDefault());
  }

  handleRefSelector(target) {
    const { id, status } = target.dataset;
    qs('.useRef').dataset.id = id;
    qs('.useRef').dataset.status = status;
  }

  handleDropinColumn({ status }, itemList) {
    const dragItem = itemList.find((v) => v.id === qs('.useRef').dataset.id);
    const order = getMaxOrder(itemList, status) + 1;
    const toBeChangeItem = { ...dragItem, status, order, lastModifiedTime: getNewDateString() };

    store.dispatch(updateItem(toBeChangeItem));
    localDB.set(toBeChangeItem.id, toBeChangeItem);
  }

  handleAddBtnClick() {
    new EditModal('.kanban-container', { category: 'createModal' });
    qs('.createModal').classList.remove('hidden');
  }
}
