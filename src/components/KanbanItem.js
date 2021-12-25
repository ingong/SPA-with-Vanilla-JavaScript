import Component from '@/common/Component';
import { qs } from '@/utils/helper';
import { store, updateItem } from '@/store/index';
export default class KanbanItem extends Component {
  template() {
    return `
    <article class="kanban-item ${this.$state.id}" data-id=${this.$state.id} data-status=${this.$state.status} draggable=true>
      <div class="item-top">
        <p>${this.$state.id}</p>
        <div class="item-top-btn">
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
      <h5>${this.$state.title}</h5>      
      <div class="item-bottom">
        <span>${this.$state.inChargePerson}</span>
        <span>수정 일시</span>
      </div> 
    </article>
    `;
  }

  setEvent() {
    const itemSelector = qs(`.${this.$state.id}`);
    const useRefSelector = qs('.useRef');

    itemSelector.addEventListener('dragenter', () => {
      if (useRefSelector.id === itemSelector.dataset.id) return;
      itemSelector.classList.add('drag__enter');
    });

    itemSelector.addEventListener('dragleave', (e) => {
      if (useRefSelector.id === itemSelector.dataset.id) return;
      if (Array.from(e.target.classList).includes('drag__enter')) {
        itemSelector.classList.remove('drag__enter');
      }
    });

    itemSelector.addEventListener('drop', (e) => {
      itemSelector.classList.remove('drag__enter');
      handleDropItem(e);
    });

    itemSelector.addEventListener('dragover', (e) => e.preventDefault());
  }
}

const getNewOrder = (itemList, targetStatus, targetId) => {
  const filteredItemList = itemList
    .filter((item) => item.status === targetStatus)
    .sort((a, b) => a.order - b.order);
  const upperIndexNearDropArea = filteredItemList.findIndex((item) => item.id === targetId);
  const itemsNearDropArea = filteredItemList.slice(
    upperIndexNearDropArea,
    upperIndexNearDropArea + 2,
  );

  if (itemsNearDropArea.length === 1) return itemsNearDropArea[0].order + 1;
  else if (itemsNearDropArea.length === 2) {
    const orderSum = itemsNearDropArea.map((item) => item.order).reduce((acc, cur) => acc + cur, 0);
    return orderSum / 2;
  } else return;
};

const handleDropItem = ({ currentTarget }) => {
  const itemList = store.getState();
  const targetStatus = currentTarget.dataset.status;
  const targetId = currentTarget.dataset.id;
  const order = getNewOrder(itemList, targetStatus, targetId);

  const useRefSelector = qs('.useRef');
  const dragItem = itemList.find((item) => item.id === useRefSelector.dataset.id);

  store.dispatch(updateItem({ ...dragItem, status: targetStatus, order }));
};
