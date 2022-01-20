import Component from '@/common/Component';
import KanbanItem from '@/components/KanbanItem';
import KanbanAddbtn from '@/components/KanbanAddbtn';
import { qs, getNewDateString } from '@/utils/helper';
import { store, updateItem } from '@/store/index';
import localDB from '@/db';

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

    const childrenTemplate = this.$state.list
      .map((value) =>
        new KanbanItem('_', {
          title: value.title,
          inChargeId: value.inChargeId,
          id: value.id,
          status: value.status,
          lastModifiedTime: value.lastModifiedTime,
        }).render(),
      )
      .join('');
    qs(kanbanListClassName).insertAdjacentHTML('beforeend', childrenTemplate);

    new KanbanAddbtn(kanbanColTitleClassName, this.$state.name);
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
      handleNewItemDrop(e);
    });
  }
}

const handleNewItemDrop = ({ currentTarget }) => {
  const itemList = store.getState();
  const targetStatus = currentTarget.dataset.status;
  const filteredList = itemList
    .filter((item) => item.status === targetStatus)
    .sort((a, b) => a.order - b.order);

  const useRefSelector = qs('.useRef');
  const dragItem = itemList.find((item) => item.id === useRefSelector.dataset.id);

  const toBeChangeItem = {
    ...dragItem,
    status: targetStatus,
    order: 0,
    lastModifiedTime: getNewDateString(),
  };

  store.dispatch(updateItem(toBeChangeItem));
  localDB.set(toBeChangeItem.id, toBeChangeItem);

  if (filteredList.length >= 1) handleExistItemAtTop(filteredList);
};

const handleExistItemAtTop = (filteredList) => {
  const existItem = filteredList[0];
  let toBeChangeItem = { ...existItem, lastModifiedTime: getNewDateString() };

  if (filteredList.length === 1) {
    store.dispatch(updateItem({ ...toBeChangeItem, order: 1 }));
    localDB.set(toBeChangeItem.id, toBeChangeItem);
    return;
  }

  if (filteredList.length > 1) {
    const frontTwoItemList = filteredList.slice(0, 2);
    const orderSum = frontTwoItemList.map((item) => item.order).reduce((acc, cur) => acc + cur, 0);
    const orderAvg = orderSum / 2;

    store.dispatch(updateItem({ ...toBeChangeItem, order: orderAvg }));
    localDB.set(toBeChangeItem.id, { ...toBeChangeItem, order: orderAvg });
    return;
  }
};
