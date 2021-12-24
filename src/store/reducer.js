const INIT = 'init';
const CREATE = 'create';
const UPDATE = 'update';
const DELETE = 'delete';

export const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case INIT:
      return [...payload];
    case CREATE:
      return [...state].concat(payload);
    case UPDATE:
      return [...state.filter((v) => v.id !== payload.id)].concat(payload);
    case DELETE:
      return [...state].filter((v) => v.id !== payload.id);
    default:
      return state;
  }
};
