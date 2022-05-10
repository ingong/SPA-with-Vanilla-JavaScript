import data from '@/pages/KanbanBoard/db/data';
import { getMaxOrder, getNewOrder } from '@/pages/KanbanBoard/utils/board';

let jsonData;

beforeEach(() => {
  jsonData = [...data.itemList];
});

describe('칸반 보드의 각각의 Status 에 해당하는 리스트의 최대 Order 반환 함수', () => {
  it('TODO 상태의 리스트 중 최대 Order 인 1 을 반환한다', () => {
    const maxOrder = getMaxOrder(jsonData, 'TODO');
    expect(maxOrder).toBe(1);
  });

  it('IN_PROGRESS 상태의 리스트 중 최대 Order 인 2 를 반환한다', () => {
    const maxOrder = getMaxOrder(jsonData, 'IN_PROGRESS');
    expect(maxOrder).toBe(2);
  });

  it('DONE 상태의 리스트 중 최대 Order 인 5 을 반환한다', () => {
    const maxOrder = getMaxOrder(jsonData, 'DONE');
    expect(maxOrder).toBe(5);
  });
});

describe('칸반 보드에서 드랍할 때 새로운 Order 반환 함수', () => {
  it('Order 값으로 0 과 1 을 갖는 ISSUE-1, ISSUE-2 사이에 드랍 시 0.5 값을 반환한다.', () => {
    const newOrder = getNewOrder(jsonData, 'TODO', 'ISSUE-1');
    expect(newOrder).toBe(0.5);
  });

  it('Order 값으로 0 과 2 을 갖는 ISSUE-4, ISSUE-5 사이에 드랍 시 1 값을 반환한다.', () => {
    const newOrder = getNewOrder(jsonData, 'IN_PROGRESS', 'ISSUE-4');
    expect(newOrder).toBe(1);
  });

  it('아이템이 하나라면 기존 Order 값에 + 1 값을 반환한다 (기존 값 5 이므로 6을 반환)', () => {
    const newOrder = getNewOrder(jsonData, 'DONE', 'ISSUE-3');
    expect(newOrder).toBe(6);
  });
});
