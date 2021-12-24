import Component from '@/common/component';

export default class KanbanItem extends Component {
  template() {
    return `
    <article>
      <p>${this.$state.id}</p>
      <h5>${this.$state.title}</h5>
      <span>${this.$state.inChargePerson}</span>
      <span>${this.$state.modifTime}</span>
    </article>
    `;
  }
}
