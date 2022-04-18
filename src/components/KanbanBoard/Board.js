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

  mountChild() {
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
    this.removeEvent();
    qs('.kanban-container').replaceChildren();
  }

  setUp() {
    store.subscribe(this.cleanup.bind(this));
    store.subscribe(this.mountChild.bind(this));
  }

  setEvent() {
    let kanbanSelector = qs('.kanban-container');
    let itemTimer, contourTimer;
    kanbanSelector.addEventListener('dragover', (e) => e.preventDefault());
    kanbanSelector.addEventListener('dragstart', ({ target }) => this.handleRefSelector(target));
    kanbanSelector.addEventListener('drop', ({ target }) => {
      target.closest('.contour-top') && this.handleDropAtTopSection(target.closest('.contour-top'));
      target.closest('article') && this.handleDropBetweenItem(target.closest('article'));
      target.dataset.id === 'column' && this.handleDropAtEmptySection(target.dataset);
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
      target.closest('.contour-top') && this.handleContourDragEvent(target.closest('.contour-top'), 'leave', contourTimer);
      target.closest('article') && this.handleItemDragEvent(target.closest('article'), 'leave', itemTimer);
    });
    kanbanSelector = null;
  }

  removeEvent() {
    let kanbanSelector = qs('.kanban-container');
    let itemTimer, contourTimer;
    kanbanSelector.removeEventListener('dragover', (e) => e.preventDefault());
    kanbanSelector.removeEventListener('dragstart', ({ target }) => this.handleRefSelector(target));
    kanbanSelector.removeEventListener('drop', ({ target }) => {
      target.closest('.contour-top') && this.handleDropAtTopSection(target.closest('.contour-top'));
      target.closest('article') && this.handleDropBetweenItem(target.closest('article'));
      target.dataset.id === 'column' && this.handleDropAtEmptySection(target.dataset);
    });
    kanbanSelector.removeEventListener('click', ({ target }) => {
      target.closest('.addBtn') && this.handleAddBtnClick();
      target.closest('.modify-button') && this.handleModifyBtnClick(target);
      target.closest('.delete-button') && this.handleDeleteBtnClick(target);
    });
    kanbanSelector.removeEventListener('dragenter', ({ target }) => {
      target.closest('.contour-top') && this.handleContourDragEvent(target.closest('.contour-top'), 'enter');
      target.closest('article') && this.handleItemDragEvent(target.closest('article'), 'enter');
    });
    kanbanSelector.removeEventListener('dragleave', ({ target }) => {
      target.closest('.contour-top') && this.handleContourDragEvent(target.closest('.contour-top'), 'leave', contourTimer);
      target.closest('article') && this.handleItemDragEvent(target.closest('article'), 'leave', itemTimer);
    });
    kanbanSelector = null;
  }

  handleRefSelector(target) {
    const { id, status } = target.dataset;
    qs('.useRef').dataset.id = id;
    qs('.useRef').dataset.status = status;
  }

  handleDropAtTopSection(target) {
    const itemList = store.getState();
    const targetStatus = target.parentNode.dataset.status;
    const droppedItem = itemList.find((item) => item.id === qs('.useRef').dataset.id);
    const shouldChangeItem = { ...droppedItem, status: targetStatus, order: 0, lastModifiedTime: getNewDateString() };
    const filterByStatusList = itemList.filter((item) => item.status === targetStatus).sort((a, b) => a.order - b.order);

    if (filterByStatusList.length < 1) {
      store.dispatch(updateItem(shouldChangeItem));
      localDB.set(shouldChangeItem.id, shouldChangeItem);
    } else {
      const averageOrder = filterByStatusList.slice(0, 2).reduce((acc, cur) => acc + cur.order, 0) / 2;
      const newOrder = Math.min(averageOrder, 1);
      const topLocatedItem = { ...filterByStatusList[0], order: newOrder };
      store.dispatch(updateItem(shouldChangeItem));
      store.dispatch(updateItem(topLocatedItem));
      localDB.set(shouldChangeItem.id, shouldChangeItem);
      localDB.set(topLocatedItem.id, topLocatedItem);
    }
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

  handleDropAtEmptySection({ status }) {
    const itemList = store.getState();
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

  handleContourDragEvent(target, eventType, timer) {
    if (eventType === 'enter') target.classList.add('drag');
    else if (eventType === 'leave') {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        target.classList.remove('drag');
      }, 250);
    }
  }

  handleItemDragEvent(target, eventType, timer) {
    if (eventType === 'enter') {
      if (qs('.useRef').dataset.id === target.dataset.id) return;
      target.nextElementSibling.classList.add('drag');
    } else if (eventType === 'leave') {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        target.nextElementSibling.classList.remove('drag');
      }, 250);
    }
  }
}
