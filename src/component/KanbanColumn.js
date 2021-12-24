import Component from '@/common/component';

export default class KanbanColumn extends Component {
  template() {
    return `
    <section>
      <h3>${this.$state.name}</h3>
      <ul>${this.$state.list.map((item) => `<li>${item}</li>`).join('')}</ul>
    </section>
    `;
  }
}
