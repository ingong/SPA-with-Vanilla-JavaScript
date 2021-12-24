import Component from '@/common/Component';
import KanbanItem from '@/components/KanbanItem';
import KanbanAddbtn from '@/components/KanbanAddbtn';

export default class KanbanColumn extends Component {
  template() {
    return `
    <section class="kanban-column">
      <h3>${this.$state.name}</h3>
      <ul class=${this.$state.name}-list></ul>
    </section>
    `;
  }

  renderChildren() {
    this.$state.list?.map(
      (value) =>
        new KanbanItem(`.${this.$state.name}-list`, {
          title: value.title,
          inChargePerson: value.inChargePerson,
        }),
    );
  }
}
