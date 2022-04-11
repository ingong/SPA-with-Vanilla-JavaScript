import Modal from '@/common/Modal';
import { qs, getNewDateString } from '@/utils/helper';
import { store, createItem, updateItem } from '@/store/index';
import { getMaxOrder, isValidClick } from '@/utils/board';
import localDB from '@/db';

export default class DefaultModal extends Modal {
  $state = {
    id: '',
    title: '',
    inChargeId: '',
    initialTitle: '',
    initialInChargeId: '',
  };

  modaltemplate() {
    return `
      <h4>항목 추가/수정</h4>
      <label for="title">이슈 제목</label>
      <input class="input__title" placeholder="이슈 제목을 입력해주세요" name="title" />
      <p class="input__title-warn"></p>
      <label for="inChargeId">담당자 id</label>
      <input class="input__inChargeId" placeholder="담당자 id를 입력해주세요" name="inChargeId" />
      <p class="input__inChargeId-warn"></p> 
    `;
  }

  mountChild() {
    this.cleanup();
    const modalContentSelector = qs('.modal__content');
    modalContentSelector.insertAdjacentHTML('beforeend', this.modaltemplate());
  }

  cleanup() {
    const modalContentSelector = qs('.modal__content');
    modalContentSelector.innerHTML = '';
  }

  handleClose(e, isOutSideClick = true) {
    if (isValidClick(['modal__button-container', 'modal', 'modal__content'], ['H4', 'INPUT', 'LABEL'], e.target))
      return;

    if (isOutSideClick) {
      const { initialInChargeId, initialTitle } = this.$state;
      this.$state = { ...this.$state, inChargeId: initialInChargeId, title: initialTitle };
    }

    const modalSelector = qs('.modal__container');
    if (modalSelector !== null) modalSelector.parentNode.lastElementChild.remove();
  }

  handleConfirmBtn(e) {
    let isPossibeForm = true;
    Array.from(Object.entries(this.$state))
      .filter((value) => value[0] === 'title' || value[0] === 'inChargeId')
      .forEach(([key, value]) => {
        if (value.length < 1) {
          this.handleWarn(key, true);
          isPossibeForm = false;
        }
      });
    if (!isPossibeForm) return;

    const { title, inChargeId, id, order, status } = this.$state;
    if (title.length === 0 || inChargeId.length === 0) return;
    if (id.length > 0) updateExistItem(title, inChargeId, order, id, status);
    else createNewItem(title, inChargeId);
    this.handleClose(e, false);
  }

  handleInput(e, category) {
    this.$state[category] = e.target.value;
    if (e.target.value.length < 1) this.handleWarn(category, true);
    else this.handleWarn(category, false);
  }

  handleWarn(category, isWarning) {
    if (isWarning) {
      qs(`.input__${category}-warn`).textContent = `${category === 'title' ? '제목' : '담당자 id'}을(를) 입력하세요`;
    } else qs(`.input__${category}-warn`).textContent = '';
  }

  setEvent() {
    qs('.modal__overlay').addEventListener('click', (e) => this.handleClose(e));
    qs('.modal__cancel').addEventListener('click', (e) => this.handleClose(e));
    qs('.modal__confirm').addEventListener('click', (e) => this.handleConfirmBtn(e));
    qs('.input__title').addEventListener('keyup', (e) => this.handleInput(e, 'title'));
    qs('.input__inChargeId').addEventListener('keyup', (e) => this.handleInput(e, 'inChargeId'));
  }

  setModalContent(id) {
    if (id === undefined) return;
    const item = store.getState().find((value) => value.id === id);
    this.$state = { ...item, initialInChargeId: item.inChargeId, initialTitle: item.title };

    qs('.input__title').value = this.$state.title;
    qs('.input__inChargeId').value = this.$state.inChargeId;
  }
}

const createNewItem = (title, inChargeId) => {
  const newDateTime = getNewDateString();
  const itemList = store.getState();
  const order = getMaxOrder(itemList, 'TODO') + 1;
  const lastId = localDB.getLastId();
  const item = {
    status: 'TODO',
    id: `ISSUE-${lastId + 1}`,
    order,
    title,
    inChargeId,
    lastModifiedTime: newDateTime,
  };

  store.dispatch(createItem(item));
  localDB.set(item.id, item);
  localDB.set('lastId', lastId + 1);
};

const updateExistItem = (title, inChargeId, order, id, status) => {
  const newDateTime = getNewDateString();
  const item = { title, inChargeId, order, id, status, lastModifiedTime: newDateTime };
  store.dispatch(updateItem(item));
  localDB.set(item.id, item);
};
