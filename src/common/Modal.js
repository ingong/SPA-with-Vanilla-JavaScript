import Component from '@/common/Component';
import { qs } from '@/utils/helper';
import '@/style/modal.css';
import { store, deleteItem } from '@/store/index';

export default class Modal extends Component {
  template() {
    return `
      <div class="modal__container hidden">
        <div class="modal__overlay">
          <div class="modal">
            <div class="modal__content"></div>
            <div class="modal__button-container">
                <button class="modal__cancel">취소</button>
                <button class="modal__confirm">확인</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  handleClose(e, exceptList = []) {
    if (e.target.className === 'modal__content') return;
    const modalContainerSelector = qs('.modal__container');
    modalContainerSelector.classList.add('hidden');
    // 버튼을 클릭하거나, input 을 클릭 하는 경우에 대해서도 예외 처리가 필요함
  }

  handleConfirmBtn(e, fn, exceptList = []) {
    // fn();
    store.dispatch(deleteItem({ id: 'ISSUE-104' }));
    console.log(this);
    this.handleClose(e);
  }

  setEvent() {
    qs('.modal__overlay').addEventListener('click', (e) => this.handleClose(e));
    qs('.modal__cancel').addEventListener('click', (e) => this.handleClose(e));
    qs('.modal__confirm').addEventListener('click', (e) => this.handleConfirmBtn(e));
  }
}
