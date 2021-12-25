import Component from '@/common/Component';
import { qs } from '@/utils/helper';
export default class KanbanAddbtn extends Component {
  template() {
    return `
      <button class='addBtn ${this.$state}-addbtn'>항목 추가</button>
    `;
  }

  setEvent() {
    qs(`.${this.$state}-addbtn`).addEventListener('click', () =>
      qs('.modal').classList.remove('hidden'),
    );
  }
}
