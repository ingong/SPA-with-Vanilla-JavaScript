export const reducer = (state = [], action = {}) => {
  switch (action.type) {
    case 'INIT_LIST':
      return [...action.payload];
    case 'DELETE_ITEM':
      return state.filter((value) => value.id !== action.payload.id);
    case 'UPDATE_ITEM':
      return [...state.filter((value) => value.id !== action.payload.id), action.payload];
    case 'CREATE_ITEM':
      return [...state, action.payload];
    default:
      return state;
  }
};
