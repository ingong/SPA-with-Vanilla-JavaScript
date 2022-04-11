import Component from '@/common/Component';
import KanbanColumn from '@/components/KanbanBoard/Column';
import EditModal from '@/components/KanbanBoard/EditModal';
import DeleteModal from '@/components/KanbanBoard/DeleteModal';

import { store, updateItem } from '@/store';
import localDB from '@/db';

import { qs, getNewDateString } from '@/utils/helper';
import { getMaxOrder, getNewOrder } from '@/utils/board';
import '@/components/KanbanBoard/style/board.scss';

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

  cleanup() {
    for (const child of [...qs('.kanban-container').children]) child.remove();
  }

  setUp() {
    store.subscribe(this.cleanup.bind(this));
    store.subscribe(this.renderChildren.bind(this));
  }

  setEvent() {
    let kanbanSelector = qs('.kanban-container');
    let timer;
    kanbanSelector.addEventListener('dragover', (e) => e.preventDefault());
    kanbanSelector.addEventListener('dragstart', ({ target }) => this.handleRefSelector(target));
    kanbanSelector.addEventListener('drop', ({ target }) => {
      target.dataset.id === 'column' && this.handleDropInColumn(target.dataset);
      target.closest('article') && this.handleDropBetweenItem(target.closest('article'));
    });
    kanbanSelector.addEventListener('click', ({ target }) => {
      target.closest('.addBtn') && this.handleAddBtnClick();
      target.closest('.modify-button') && this.handleModifyBtnClick(target);
      target.closest('.delete-button') && this.handleDeleteBtnClick(target);
    });
    kanbanSelector.addEventListener('dragenter', ({ target }) => {
      target.closest('.contour-top') && this.handleContourDragEvent(target.closest('.contour-top'), 'enter');
      target.closest('article') && this.handleItemDragEvent(target.closest('article'), 'enter');
    });
    kanbanSelector.addEventListener('dragleave', ({ target }) => {
      target.closest('article') && this.handleItemDragEvent(target.closest('article'), 'leave', timer);
    });
    kanbanSelector = null;
  }

  handleRefSelector(target) {
    const { id, status } = target.dataset;
    qs('.useRef').dataset.id = id;
    qs('.useRef').dataset.status = status;
  }

  handleDropInColumn({ status }) {
    const itemList = store.getState();
    const dragItem = itemList.find((v) => v.id === qs('.useRef').dataset.id);
    const order = getMaxOrder(itemList, status) + 1;
    const toBeChangeItem = { ...dragItem, status, order, lastModifiedTime: getNewDateString() };
    store.dispatch(updateItem(toBeChangeItem));
    localDB.set(toBeChangeItem.id, toBeChangeItem);
  }

  handleDropBetweenItem(target) {
    const itemList = store.getState();
    const { id, status } = target.dataset;
    const order = getNewOrder(itemList, status, id);
    const dragItem = itemList.find((item) => item.id === qs('.useRef').dataset.id);
    const shouldChangeItem = { ...dragItem, status, order, lastModifiedTime: getNewDateString() };
    store.dispatch(updateItem(shouldChangeItem));
    localDB.set(shouldChangeItem.id, shouldChangeItem);
  }

  handleAddBtnClick() {
    new EditModal('.kanban-container', { category: 'createModal' });
    qs('.createModal').classList.remove('hidden');
  }

  handleModifyBtnClick(target) {
    const modifyModal = new EditModal('.kanban-container', { category: 'modifyModal' });
    const id = target.closest('.item').dataset.id;
    modifyModal.setModalContent(id);
    qs('.modifyModal').classList.remove('hidden');
  }

  handleDeleteBtnClick(target) {
    const deleteModal = new DeleteModal('.kanban-container', { category: 'deleteModal' });
    const id = target.closest('.item').dataset.id;
    deleteModal.setModalContent(id);
    qs('.deleteModal').classList.remove('hidden');
  }

  handleContourDragEvent(target, eventType) {
    if (eventType === 'enter') target.classList.add('drag');
    else if (eventType === 'leave') target.classList.remove('drag');
  }

  handleItemDragEvent(target, eventType, timer) {
    if (eventType === 'enter') {
      if (qs('.useRef').dataset.id === target.dataset.id) return;
      target.nextElementSibling.classList.add('drag');
    } else if (eventType === 'leave') {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        target.nextElementSibling.classList.remove('drag');
      }, 200);
    }
  }
}
