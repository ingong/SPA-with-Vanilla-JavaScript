import Component from '@/common/Component';
import KanbanItem from '@/components/KanbanItem';
import KanbanAddbtn from '@/components/KanbanAddbtn';
import { qs } from '@/utils/helper';
import { store, updateItem } from '@/store/index';
export default class KanbanColumn extends Component {
  template() {
    return `
    <section class="kanban-column" data-status=${this.$state.name} data-id=column>
      <div class="kanban-column__title ${this.$state.name}-title">
        <h3>${this.$state.name}</h3>
      </div>
      <div class="kanban__column-line ${this.$state.name}-line" data-status=${this.$state.name}></div>
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
          inChargeId: value.inChargeId,
          id: value.id,
          status: value.status,
          lastModifiedTime: value.lastModifiedTime,
        }),
    );
  }

  setEvent() {
    const divideLineSelector = qs(`.${this.$state.name}-line`);

    divideLineSelector.addEventListener('dragenter', () => {
      divideLineSelector.classList.add('drag__enter');
    });

    divideLineSelector.addEventListener('dragleave', (e) => {
      divideLineSelector.classList.remove('drag__enter');
    });

    divideLineSelector.addEventListener('drop', (e) => {
      divideLineSelector.classList.remove('drag__enter');
      handleDropItemAtTop(e);
    });
  }
}

const handleDropItemAtTop = ({ currentTarget }) => {
  const itemList = store.getState();
  const targetStatus = currentTarget.dataset.status;
  const filteredList = itemList
    .filter((item) => item.status === targetStatus)
    .sort((a, b) => a.order - b.order);
  const firstItem = filteredList[0] || [];

  const useRefSelector = qs('.useRef');
  const dragItem = itemList.find((item) => item.id === useRefSelector.dataset.id);

  store.dispatch(updateItem({ ...dragItem, status: targetStatus, order: 0 }));

  if (filteredList.length > 1) {
    const frontTwoItemList = filteredList.slice(0, 2);
    const orderSum = frontTwoItemList.map((item) => item.order).reduce((acc, cur) => acc + cur, 0);
    const orderAvg = orderSum / 2;
    store.dispatch(updateItem({ ...firstItem, order: orderAvg }));
  } else if (filteredList.length === 1) {
    store.dispatch(updateItem({ ...firstItem, order: 1 }));
  }
};
