import Component from '@/common/component';

export default class KanbanItem extends Component {
  template() {
    console.log(this.$state);
    return `
    <article>
      <p></p>
      <h5>${this.$state.title}</h5>
      <span>${this.$state.inChargePerson}</span>
      <span></span>
    </article>
    `;
  }
}

{
  /* <p>${this.$state.id}</p>
<span>${this.$state.modifTime}</span> */
}
