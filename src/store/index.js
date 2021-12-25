import { createStore } from '@/store/createStore';
import { reducer } from '@/store/reducer';

export const store = createStore(reducer);
export const actionType = {
  INIT: 'INIT',
  DELETE_ITEM: 'DELETE_ITEM',
};

export const storeInit = (payload) => ({ type: actionType.INIT, payload });
export const deleteItem = (payload) => ({ type: actionType.DELETE_ITEM, payload });
