import data from '@/db/data';
import { store, storeInit, createItem, updateItem, deleteItem } from '@/store/index';

const toBeCreateItem = {
  status: 'TODO',
  id: 'ISSUE-6',
  order: 10,
  title: 'TEST TITLE',
  inChargeId: 'TEST USER',
  lastModifiedTime: 'NOW',
};

beforeEach(() => {
  store.dispatch(storeInit(data.itemList));
});

describe('Store Init', () => {
  it('기존 5 개의 아이템을 Store 상태로 초기화하면, 상태는 5의 길이를 갖는다', () => {
    expect(store.getState().length).toBe(5);
  });
});

describe('Store Create', () => {
  it('아이템을 추가하면, Store 는 6 의 크기를 갖는다', () => {
    store.dispatch(createItem(toBeCreateItem));
    expect(store.getState().length).toBe(6);
  });

  it('Store에 아이템을 추가하면, 크기가 2 였던 TODO 상태는 3을 갖는다', () => {
    expect(store.getState().filter((v) => v.status === 'TODO').length).toBe(2);
    store.dispatch(createItem(toBeCreateItem));
    expect(store.getState().filter((v) => v.status === 'TODO').length).toBe(3);
  });
});

describe('Store Delete', () => {
  it('ISSUE-1 아이템을 삭제하면, Store 의 크기는 5 에서 4 로 감소한다.', () => {
    expect(store.getState().length).toBe(5);
    store.dispatch(deleteItem({ id: 'ISSUE-1' }));
    expect(store.getState().length).toBe(4);
  });
});

describe('Store Update', () => {
  it('ISSUE-1 아이템의 이름을 TEST1 으로 수정하면 title 속성이 해당 값으로 변경된다', () => {
    store.dispatch(updateItem({ id: 'ISSUE-1', title: 'TEST1' }));
    expect(store.getState().find((v) => v.id === 'ISSUE-1').title).toBe('TEST1');
  });

  it('ISSUE-1 아이템의 담당자 id 를 TESTUser1 로 수정하면 title 속성이 해당 값으로 변경된다', () => {
    store.dispatch(updateItem({ id: 'ISSUE-1', title: 'TESTUser1 ' }));
    expect(store.getState().find((v) => v.id === 'ISSUE-1').title).toBe('TESTUser1 ');
  });
});
