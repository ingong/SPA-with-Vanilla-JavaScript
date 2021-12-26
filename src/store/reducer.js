const initState = [
  {
    status: 'TODO',
    title: 'a',
    inChargeId: 'insong',
    id: 'ISSUE-104',
    order: 1,
    lastModifiedTime: 0,
  },
  {
    status: 'TODO',
    title: 'b',
    inChargeId: 'insong',
    id: 'ISSUE-105',
    order: 0,
    lastModifiedTime: 0,
  },
  {
    status: 'DONE',
    title: 'c',
    inChargeId: 'insong',
    id: 'ISSUE-106',
    order: 0,
    lastModifiedTime: 0,
  },
];

export const reducer = (state = initState, action = {}) => {
  switch (action.type) {
    case 'INIT':
      return [...state];
    case 'DELETE_ITEM':
      return state.filter((value) => value.id !== action.payload.id);
    case 'UPDATE_ITEM':
      return state.filter((value) => value.id !== action.payload.id).concat(action.payload);
    case 'CREATE_ITEM':
      // 가장 큰 order 값 부여
      // 수정 일시를 방금 작성한 시간
      // id 를 동적으로 부여해야합니다
      return [...state, action.payload];
    default:
      return state;
  }
};
