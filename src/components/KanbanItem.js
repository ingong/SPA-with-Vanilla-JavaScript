import Component from '@/common/Component';
import { qs } from '@/utils/helper';

export default class KanbanItem extends Component {
  template() {
    return `
    <article class="kanban-item ${this.$state.id}" data-id=${this.$state.id} data-status=${this.$state.status} draggable=true>
      <div class="item-top">
        <p>${this.$state.id}</p>
        <div class="item-top-btn">
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
      <h5>${this.$state.title}</h5>      
      <div class="item-bottom">
        <span>${this.$state.inChargePerson}</span>
        <span>수정 일시</span>
      </div> 
    </article>
    `;
  }

  setEvent() {
    const itemSelector = qs(`.${this.$state.id}`);
    const useRefSelector = qs('.useRef');

    itemSelector.addEventListener('dragenter', () => {
      if (useRefSelector.id === itemSelector.dataset.id) return;
      itemSelector.classList.add('drag__enter');
    });

    itemSelector.addEventListener('dragleave', (e) => {
      if (Array.from(e.target.classList).includes('drag__enter')) {
        itemSelector.classList.remove('drag__enter');
      }
    });

    itemSelector.addEventListener('drop', (e) => handleDropItem(e));

    itemSelector.addEventListener('dragover', (e) => e.preventDefault());
  }
}

const handleDropItem = (e) => console.log(e.currentTarget);
