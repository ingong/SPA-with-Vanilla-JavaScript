import Component from '@/common/Component';
import { qs } from '@/utils/helper';
import '@/style/modal.css';
import { store, deleteItem } from '@/store/index';

export default class Modal extends Component {
  template() {
    return `
      <div class="modal hidden">
        <div class="modal__overlay"/>
        <div class="modal__content">
          <h2>정말로 아이템을 삭제하시겠습니까?</h2>
          <div class="modal__button-container">
            <button class="modal__cancel">취소</button>
            <button class="modal__confirm">확인</button>
          </div>
        </div>
      </div>
    `;
  }

  setEvent() {
    const closeModal = () => qs('.modal').classList.add('hidden');
    const confirmModalBtn = () => {
      closeModal();
      store.dispatch(deleteItem({ id: 'ISSUE-104' }));
    };

    qs('.modal__overlay').addEventListener('click', closeModal);
    qs('.modal__cancel').addEventListener('click', closeModal);
    qs('.modal__confirm').addEventListener('click', confirmModalBtn);
  }
}
