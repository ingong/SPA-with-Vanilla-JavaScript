import Modal from '@/common/Modal';
import { qs } from '@/utils/helper';
import { store, deleteItem } from '@/store/index';
import localDB from '@/db';

export default class DeleteModal extends Modal {
  $state;

  renderChildren(id) {
    this.$state = id;
    this.cleanUpChildren();

    const modalContentSelector = qs('.modal__content');
    const modalContent = `<h4>${id} 아이템을 삭제하시겠습니까?</h4>`;

    modalContentSelector.insertAdjacentHTML('beforeend', modalContent);
  }

  cleanUpChildren() {
    const modalContentSelector = qs('.modal__content');
    modalContentSelector.innerHTML = '';
  }

  handleClose(e) {
    if (
      ['modal__button-container', 'modal', 'modal__content'].includes(e.target.className) ||
      ['H4', 'BUTTON'].includes(e.target.tagName)
    )
      return;

    qs('.modal__container').parentNode.lastElementChild.remove();
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
