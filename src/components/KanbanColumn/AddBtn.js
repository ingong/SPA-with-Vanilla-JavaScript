import Component from '@/common/Component';
import { qs } from '@/utils/helper';
import EditModal from '@/components/KanbanModal/EditModal';

export default class Addbtn extends Component {
  template() {
    return `
      <button class='addBtn ${this.$state}-addbtn'>항목 추가</button>
    `;
  }

  setEvent() {
    const addBtnSelector = qs(`.${this.$state}-addbtn`);
    addBtnSelector.addEventListener('click', () => {
      new EditModal('.kanban-container', { category: 'createModal' });
      qs('.createModal').classList.remove('hidden');
    });
  }
}
