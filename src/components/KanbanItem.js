import Component from '@/common/Component';
import { qs, getNewDateString } from '@/utils/helper';
import { getNewOrder } from '@/utils/board';
import { store, updateItem } from '@/store/index';
import DeleteModal from '@/components/DeleteModal';
import DefaultModal from '@/components/DefaultModal';
import localDB from '@/db';

export default class KanbanItem extends Component {
  template() {
    return `
    <article class="kanban-item ${this.$state.id}" data-id=${this.$state.id} data-status=${this.$state.status} draggable=true>
      <div class="item-top">
        <p>${this.$state.id}</p>
        <div class="item-top-btn">
          <button class="item__modify">수정</button>
          <button class="item__delete">삭제</button>
        </div>
      </div>
      <h5>${this.$state.title}</h5>      
      <div class="item-bottom">
        <span>${this.$state.inChargeId}</span>
        <span>${this.$state.lastModifiedTime}</span>
      </div> 
    </article>
    `;
  }

  setDeleteModal() {
    const deleteModal = new DeleteModal('.kanban-container', { category: 'deleteModal' });
    deleteModal.renderChildren(this.$state.id);
    qs('.deleteModal').classList.remove('hidden');
  }

  setModifyModal() {
    const modifyModal = new DefaultModal('.kanban-container', { category: 'modifyModal' });
    modifyModal.setUp(this.$state.id);
    qs('.modifyModal').classList.remove('hidden');
  }

  handleDropItem({ currentTarget }) {
    const itemList = store.getState();
    const targetStatus = currentTarget.dataset.status;
    const targetId = currentTarget.dataset.id;
    const order = getNewOrder(itemList, targetStatus, targetId);

    const useRefSelector = qs('.useRef');
    const dragItem = itemList.find((item) => item.id === useRefSelector.dataset.id);
    const toBeChangeItem = {
      ...dragItem,
      status: targetStatus,
      order,
      lastModifiedTime: getNewDateString(),
    };

    store.dispatch(updateItem(toBeChangeItem));
    localDB.set(toBeChangeItem.id, toBeChangeItem);
  }

  setEvent() {
    const itemSelector = qs(`.${this.$state.id}`);
    const useRefSelector = qs('.useRef');
    const deleteBtnSelector = qs('.item__delete', itemSelector);
    const modifyBtnSelector = qs('.item__modify', itemSelector);

    deleteBtnSelector.addEventListener('click', () => this.setDeleteModal());
    modifyBtnSelector.addEventListener('click', () => this.setModifyModal());

    itemSelector.addEventListener('dragenter', () => {
      if (useRefSelector.dataset.id === itemSelector.dataset.id) return;
      itemSelector.classList.add('drag__enter');
    });

    itemSelector.addEventListener('dragleave', (e) => {
      if (useRefSelector.id === itemSelector.dataset.id) return;
      if (Array.from(e.target.classList).includes('drag__enter')) {
        itemSelector.classList.remove('drag__enter');
      }
    });

    itemSelector.addEventListener('drop', (e) => {
      itemSelector.classList.remove('drag__enter');
      this.handleDropItem(e);
    });

    itemSelector.addEventListener('dragover', (e) => e.preventDefault());
  }
}
