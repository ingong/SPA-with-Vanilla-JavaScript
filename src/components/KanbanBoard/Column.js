import Component from '@/common/Component';
import Item from '@/components/KanbanBoard/Item';
import { qs, getNewDateString } from '@/utils/helper';
import { store, updateItem } from '@/store/index';
import localDB from '@/db';
import '@/components/KanbanBoard/style/column.scss';

export default class KanbanColumn extends Component {
  template() {
    return `
    <section class="kanban-column" data-status=${this.$state.name} data-id=column>
      <div class="kanban-column__title ${this.$state.name}-title">
        <h3>${this.$state.name}</h3>
        <button class='addBtn'>항목 추가</button>
      </div>
      <div class="kanban__column-line ${this.$state.name}-line" data-status=${this.$state.name}></div>
      <ul class=${this.$state.name}-list></ul>
    </section>
    `;
  }

  renderChildren() {
    const childrenTemplate = this.$state.list
      .map((value) =>
        new Item('_', {
          title: value.title,
          inChargeId: value.inChargeId,
          id: value.id,
          status: value.status,
          lastModifiedTime: value.lastModifiedTime,
        }).render(),
      )
      .map((template, index) => {
        if (index === 0) return '<hr>' + template + '<hr>';
        else return template + '<hr>';
      })
      .join('');
    const kanbanListClassName = `.${this.$state.name}-list`;
    qs(kanbanListClassName).insertAdjacentHTML('beforeend', childrenTemplate);
  }

  setEvent() {
    const divideLineSelector = qs(`.${this.$state.name}-line`);
    divideLineSelector.addEventListener('dragenter', () => {
      divideLineSelector.classList.add('drag__enter');
    });
    divideLineSelector.addEventListener('dragleave', () => {
      divideLineSelector.classList.remove('drag__enter');
    });
    divideLineSelector.addEventListener('drop', (e) => {
      console.log('drop');
      divideLineSelector.classList.remove('drag__enter');
      handleDroppedItem(e);
    });
  }
}

const handleDroppedItem = ({ currentTarget }) => {
  console.log('why');
  const itemList = store.getState();
  const targetStatus = currentTarget.dataset.status;
  const filteredList = itemList.filter((item) => item.status === targetStatus).sort((a, b) => a.order - b.order);
  const useRefSelector = qs('.useRef');
  const dragItem = itemList.find((item) => item.id === useRefSelector.dataset.id);
  const toBeChangeItem = {
    ...dragItem,
    status: targetStatus,
    order: 0,
    lastModifiedTime: getNewDateString(),
  };

  console.log(toBeChangeItem);

  store.dispatch(updateItem(toBeChangeItem));
  localDB.set(toBeChangeItem.id, toBeChangeItem);
  const shouldChange = filteredList.length >= 1;
  if (shouldChange) handleTopPosItem(filteredList);
};

const handleTopPosItem = (filteredList) => {
  const toBeChangeItem = { ...filteredList[0], lastModifiedTime: getNewDateString() };
  const shouldChangeTwoItemList = filteredList.slice(0, 2);
  const shouldChange = filteredList.length === 1 ? false : true;
  if (shouldChange) {
    store.dispatch(updateItem({ ...toBeChangeItem, order: 1 }));
    localDB.set(toBeChangeItem.id, toBeChangeItem);
  } else {
    const sumOfOrder = shouldChangeTwoItemList.reduce((acc, cur) => acc + cur.item, 0);
    const orderAvg = sumOfOrder / 2;
    store.dispatch(updateItem({ ...toBeChangeItem, order: orderAvg }));
    localDB.set(toBeChangeItem.id, { ...toBeChangeItem, order: orderAvg });
  }
};
