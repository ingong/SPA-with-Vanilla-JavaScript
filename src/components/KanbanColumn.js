import Component from '@/common/Component';
import KanbanItem from '@/components/KanbanItem';
import KanbanAddbtn from '@/components/KanbanAddbtn';

export default class KanbanColumn extends Component {
  template() {
    return `
    <section class="kanban-column">
      <div class="kanban-column__title ${this.$state.name}-title">
        <h3>${this.$state.name}</h3>
      </div>
      <ul class=${this.$state.name}-list></ul>
    </section>
    `;
  }

  renderChildren() {
    new KanbanAddbtn(`.${this.$state.name}-title`, this.$state.name);

    this.$state.list?.map(
      (value) =>
        new KanbanItem(`.${this.$state.name}-list`, {
          title: value.title,
          inChargePerson: value.inChargePerson,
        }),
    );
  }
}
