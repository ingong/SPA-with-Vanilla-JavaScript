import Modal from '@/common/Modal';
import { qs } from '@/utils/helper';
import { store, createItem } from '@/store/index';

export default class DefaultModal extends Modal {
  #state = {};

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

  renderChildren(id = '') {
    if (id !== '') this.#state.id = id; // id 로 조회해서 state 에 집어 넣는다
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
      ['modal__button-container', 'modal', 'modal__content'].includes(e.target.className) ||
      ['H4', 'BUTTON', 'INPUT', 'LABEL'].includes(e.target.tagName)
    )
      return;

    const modalContainerSelector = qs('.modal__container');
    modalContainerSelector.classList.add('hidden');
  }

  setEvent() {
    qs('.modal__overlay').addEventListener('click', (e) => this.handleClose(e));
    qs('.modal__cancel').addEventListener('click', (e) => this.handleClose(e));
    qs('.modal__confirm').addEventListener('click', (e) => this.handleConfirmBtn(e));
    qs('.input__title').addEventListener('keyup', (e) => this.handleInput(e, 'title'));
    qs('.input__inChargeId').addEventListener('keyup', (e) => this.handleInput(e, 'inChargeId'));
  }
}
