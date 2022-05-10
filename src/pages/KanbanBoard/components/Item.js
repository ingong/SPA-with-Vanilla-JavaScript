import Component from '@/pages/KanbanBoard/common/Component';
import '@/pages/KanbanBoard/style/item.scss';

export default class Item extends Component {
  render() {
    setTimeout(() => this.setEvent(), 0);
    return this.template();
  }

  template() {
    return `
    <article class="item ${this.$state.id}" data-id=${this.$state.id} data-status=${this.$state.status} draggable=true>
      <div class="item__upper">
        <p>${this.$state.id}</p>
        <div class="item__upper-btns">
          <button class="modify-button">수정</button>
          <button class="delete-button">삭제</button>
        </div>
      </div>
      <h5>${this.$state.title}</h5>      
      <div class="item__bottom">
        <span>${this.$state.inChargeId}</span>
        <span>${this.$state.lastModifiedTime}</span>
      </div> 
    </article>
    `;
  }
}
