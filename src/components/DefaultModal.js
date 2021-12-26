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

  renderChildren() {
    this.cleanUpChildren();
    const modalContentSelector = qs('.modal__content');
    modalContentSelector.insertAdjacentHTML('beforeend', this.modaltemplate());
  }

  cleanUpChildren() {
    const modalContentSelector = qs('.modal__content');
    modalContentSelector.innerHTML = '';
  }

  handleClose(e) {
    if (
      isValidClick(
        ['modal__button-container', 'modal', 'modal__content'],
        ['H4', 'BUTTON', 'INPUT', 'LABEL'],
        e.target,
      )
    )
      return;

    qs('.modal__container').parentNode.lastElementChild.remove();
  }

  handleConfirmBtn(e) {
    let isPossibeForm = true;
    Object.entries(this.$state).forEach(([key, value]) => {
      if (key !== 'id' && value.length < 1) {
        this.handleWarn(key, true);
        isPossibeForm = false;
      }
    });
    if (!isPossibeForm) return;
    const { title, inChargeId, id, order, status } = this.$state;
    if (id !== '') updateExistItem(title, inChargeId, order, id, status);
    else createNewItem(title, inChargeId);

    this.handleClose(e);
  }

  handleInput(e, category) {
    this.$state[category] = e.target.value;
    if (e.target.value.length < 1) this.handleWarn(category, true);
    else this.handleWarn(category, false);
  }

  handleWarn(category, isWarning) {
    if (isWarning) {
      qs(`.input__${category}-warn`).textContent = `${
        category === 'title' ? '제목' : '담당자 id'
      }을(를) 입력하세요`;
    } else qs(`.input__${category}-warn`).textContent = '';
  }

  setEvent() {
    qs('.modal__overlay').addEventListener('click', (e) => this.handleClose(e));
    qs('.modal__cancel').addEventListener('click', (e) => this.handleClose(e));
    qs('.modal__confirm').addEventListener('click', (e) => this.handleConfirmBtn(e));
    qs('.input__title').addEventListener('keyup', (e) => this.handleInput(e, 'title'));
    qs('.input__inChargeId').addEventListener('keyup', (e) => this.handleInput(e, 'inChargeId'));
  }

  setUp(id) {
    if (id === undefined) return;
    const item = store.getState().find((value) => value.id === id);
    this.$state = item;

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
