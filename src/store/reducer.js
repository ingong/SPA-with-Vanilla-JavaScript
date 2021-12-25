const initState = [
  {
    status: 'TODO',
    title: 'a',
    inChargePerson: 'insong',
    id: 'ISSUE-104',
    order: 1,
  },
  {
    status: 'TODO',
    title: 'b',
    inChargePerson: 'insong',
    id: 'ISSUE-105',
    order: 0,
  },
  {
    status: 'DONE',
    title: 'c',
    inChargePerson: 'insong',
    id: 'ISSUE-106',
    order: 0,
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
      return [...state, action.payload];
    default:
      return state;
  }
};
