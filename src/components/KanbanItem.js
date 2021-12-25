import Component from '@/common/Component';

export default class KanbanItem extends Component {
  template() {
    return `
    <article class="kanban-item">
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
}
