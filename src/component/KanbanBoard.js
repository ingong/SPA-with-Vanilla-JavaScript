import Component from '@/common/component';
import KanbanColumn from '@/component/KanbanColumn';
import '@/style/kanban.css';
export default class KanbanBoard extends Component {
  template() {
    return `
    <main>
      <h1>칸반 보드</h1>
      <section class="kanban-container">
      </section>
    </main>
    `;
  }
  renderChildren() {
    this.$state.map((v) => new KanbanColumn('.kanban-container', { name: v, list: [] }));
  }
}
