import Component from '@/common/Component';
import KanbanItem from '@/components/KanbanItem';
import KanbanAddbtn from '@/components/KanbanAddbtn';

export default class KanbanColumn extends Component {
  template() {
    return `
    <section class="kanban-column" data-status=${this.$state.name} data-id=column>
      <div class="kanban-column__title ${this.$state.name}-title">
        <h3>${this.$state.name}</h3>
      </div>
      <ul class=${this.$state.name}-list></ul>
    </section>
    `;
  }

  renderChildren() {
    const kanbanColTitleClassName = `.${this.$state.name}-title`;
    const kanbanListClassName = `.${this.$state.name}-list`;

    new KanbanAddbtn(kanbanColTitleClassName, this.$state.name);
    this.$state.list?.map(
      (value) =>
        new KanbanItem(kanbanListClassName, {
          title: value.title,
          inChargePerson: value.inChargePerson,
          id: value.id,
          status: value.status,
        }),
    );
  }
}
