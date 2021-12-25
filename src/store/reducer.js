const initState = [
  {
    status: 'TODO',
    title: 'a',
    inChargePerson: 'insong',
    id: 'ISSUE-104',
  },
  {
    status: 'TODO',
    title: 'b',
    inChargePerson: 'insong',
    id: 'ISSUE-105',
  },
];

export const reducer = (state = initState, action = {}) => {
  switch (action.type) {
    case 'INIT':
      return [...state];
    case 'DELETE_ITEM':
      return state.filter((value) => value.id !== action.payload);
    default:
      return state;
  }
};
