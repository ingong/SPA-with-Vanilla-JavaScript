import Component from '@/common/Component';
import { qs } from '@/utils/helper';
import KanbanColumn from '@/components/KanbanColumn';
import Modal from '@/common/Modal';
import { store, storeInit, updateItem } from '@/store/index';
import '@/style/kanban.css';

export default class KanbanBoard extends Component {
  // TODO $ 와 # 의 차이를 구분해서 사용
  $draggingItem;

  template() {
    return `
      <main>
        <h1>칸반 보드</h1>
        <section class="kanban-container">
        </section>
      </main>
    `;
  }

  cleanUpChildren() {
    qs('.kanban-container').innerHTML = '';
  }

  renderChildren() {
    ['TODO', 'IN_PROGRESS', 'DONE'].map(
      (value) =>
        new KanbanColumn('.kanban-container', {
          draggingItem: this.$draggingItem,
          name: value,
          list: store
            .getState()
            ?.filter((v) => v.status === value)
            .sort((a, b) => a.order - b.order),
        }),
    );

    new Modal('.kanban-container');
  }

  // TODO EventListener 제거
  setEvent() {
    qs('.kanban-container').addEventListener('dragstart', (e) => {
      const { id, status } = e.target.dataset;
      this.$draggingItem = { id, status };
    });

    qs('.kanban-container').addEventListener('drop', (e) =>
      handleDropinColumn(e.target.dataset, this.$draggingItem, store.getState()),
    );

    qs('.kanban-container').addEventListener('dragover', (e) => e.preventDefault());
  }

  setUp() {
    store.subscribe(this.cleanUpChildren.bind(this));
    store.subscribe(this.renderChildren.bind(this));
    storeInit();
  }
}

const handleDropinColumn = ({ id, status }, draggingItem, itemList) => {
  if (id !== 'column') return;
  const targetItem = itemList.find((v) => v.id === draggingItem.id);
  store.dispatch(updateItem({ ...targetItem, status, order: 1 }));

  // 칼럼을 기준으로 나눔
  // if 놓여진 위치가 새로운 컬럼
  // else if 놓여진 위치가 동일한 칼럼
  // 둘 다 order 를 최신화해야함

  // 아이템 기준
  // 아이템의 최상단 -> 2개의 아이템의 변화가 필요함 (첫 번째꺼 0, 두 번째꺼는 기존 : 0 + 기존 두 번째)
  // 아이템의 중간 -> drop 된 곳을 기준으로 order 를 계산하고 본인것만 최신화
  // 아이템의 맨 마지막 -> 기존 존재하는 배열에서
};
