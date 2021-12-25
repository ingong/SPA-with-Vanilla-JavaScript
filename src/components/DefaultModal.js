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

  handleConfirmBtn(e) {
    if (Object.keys(this.#state).length === 0) {
      ['title', 'inChargeId'].map((value) => this.handleWarn(value, true));
      return;
    }

    let isPossibeForm = true;
    Object.entries(this.#state).forEach(([key, value]) => {
      if (value.length < 1) {
        this.handleWarn(key, true);
        isPossibeForm = false;
      }
    });
    if (!isPossibeForm) return;

    store.dispatch(createItem({ id: 'ISSUE', status: 'TODO', ...this.#state }));
    this.handleClose(e);
  }

  handleInput(e, category) {
    this.#state[category] = e.target.value;
    if (e.target.value.length < 1) this.handleWarn(category, true);
    else this.handleWarn(category, false);
  }

  handleWarn(category, isWarning) {
    if (isWarning)
      qs(`.input__${category}-warn`).textContent = `${
        category === 'title' ? '제목' : '담당자 id'
      }을(를) 입력하세요`;
    else qs(`.input__${category}-warn`).textContent = '';
  }

  setEvent() {
    qs('.modal__overlay').addEventListener('click', (e) => this.handleClose(e));
    qs('.modal__cancel').addEventListener('click', (e) => this.handleClose(e));
    qs('.modal__confirm').addEventListener('click', (e) => this.handleConfirmBtn(e));
    qs('.input__title').addEventListener('keyup', (e) => this.handleInput(e, 'title'));
    qs('.input__inChargeId').addEventListener('keyup', (e) => this.handleInput(e, 'inChargeId'));
  }
}
