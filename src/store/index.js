import { createStore } from '@/store/createStore';
import { reducer } from '@/store/reducer';

export const store = createStore(reducer);
export const actionType = {
  INIT_LIST: 'INIT_LIST',
  DELETE_ITEM: 'DELETE_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  CREATE_ITEM: 'CREATE_ITEM',
};

export const storeInit = (payload) => ({ type: actionType.INIT_LIST, payload });
export const deleteItem = (payload) => ({ type: actionType.DELETE_ITEM, payload });
export const updateItem = (payload) => ({ type: actionType.UPDATE_ITEM, payload });
export const createItem = (payload) => ({ type: actionType.CREATE_ITEM, payload });
