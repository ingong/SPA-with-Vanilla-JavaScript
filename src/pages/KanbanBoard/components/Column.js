import Component from '@/pages/KanbanBoard/common/Component';
import Item from '@/pages/KanbanBoard/components/Item';
import { qs } from '@/pages/KanbanBoard/utils/helper';
import '@/pages/KanbanBoard/style/column.scss';

export default class KanbanColumn extends Component {
  template() {
    return `
    <section class="kanban-column" data-status=${this.$state.name} data-id=column>
      <div class="kanban-column__title ${this.$state.name}-title">
        <h3>${this.$state.name}</h3>
        <button class='addBtn'>항목 추가</button>
      </div>
      <ul class=${this.$state.name}-list data-status=${this.$state.name}></ul>
    </section>
    `;
  }

  mountChild() {
    const childrenTemplate = this.$state.list
      .map((value) =>
        new Item('_', {
          title: value.title,
          inChargeId: value.inChargeId,
          id: value.id,
          status: value.status,
          lastModifiedTime: value.lastModifiedTime,
        }).render(),
      )
      .map((template, index) => {
        if (index === 0) return '<hr class="contour-top">' + template + '<hr>';
        else return template + '<hr>';
      })
      .join('');
    qs(`.${this.$state.name}-list`).insertAdjacentHTML('beforeend', childrenTemplate);
  }
}
