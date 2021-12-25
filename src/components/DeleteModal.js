import Modal from '@/common/Modal';
import { qs } from '@/utils/helper';
import { store, deleteItem } from '@/store/index';

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
      e.target.className === 'modal' ||
      e.target.tagName === 'H4' ||
      e.target.tagName === 'BUTTON'
    )
      return;

    const modalContainerSelector = qs('.modal__container');
    modalContainerSelector.classList.add('hidden');
  }

  handleConfirmBtn(e) {
    store.dispatch(deleteItem({ id: this.$state }));
    this.handleClose(e);
  }

  setEvent() {
    qs('.modal__overlay').addEventListener('click', (e) => this.handleClose(e));
    qs('.modal__cancel').addEventListener('click', (e) => this.handleClose(e));
    qs('.modal__confirm').addEventListener('click', (e) => this.handleConfirmBtn(e));
  }
}
