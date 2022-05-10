import Component from '@/pages/KanbanBoard/common/Component';
import '@/pages/KanbanBoard/common/Modal.css';

export default class Modal extends Component {
  $state;

  template() {
    return `
      <div class="modal__container ${this.$state.category} hidden">
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
}
