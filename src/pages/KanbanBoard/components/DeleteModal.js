import Modal from '@/pages/KanbanBoard/common/Modal';
import { qs } from '@/pages/KanbanBoard/utils/helper';
import { store, deleteItem } from '@/pages/KanbanBoard/store/index';
import { isValidClick } from '@/pages/KanbanBoard/utils/board';
import localDB from '@/pages/KanbanBoard/db';

export default class DeleteModal extends Modal {
  $state;

  setModalContent(id) {
    this.$state = id;
    this.cleanup();

    const modalContentSelector = qs('.modal__content');
    const modalContent = `<h4>${id} 아이템을 삭제하시겠습니까?</h4>`;
    modalContentSelector.insertAdjacentHTML('beforeend', modalContent);
  }

  cleanup() {
    const modalContentSelector = qs('.modal__content');
    modalContentSelector.innerHTML = '';
  }

  handleClose(e) {
    if (isValidClick(['modal__button-container', 'modal', 'modal__content'], ['H4'], e.target)) return;
    const modalSelector = qs('.modal__container');
    if (modalSelector !== null) modalSelector.parentNode.lastElementChild.remove();
  }

  handleConfirmBtn(e) {
    const id = this.$state;
    store.dispatch(deleteItem({ id }));
    localDB.delete(id);
    this.handleClose(e);
  }

  setEvent() {
    qs('.modal__overlay').addEventListener('click', (e) => this.handleClose(e));
    qs('.modal__cancel').addEventListener('click', (e) => this.handleClose(e));
    qs('.modal__confirm').addEventListener('click', (e) => this.handleConfirmBtn(e));
  }
}
