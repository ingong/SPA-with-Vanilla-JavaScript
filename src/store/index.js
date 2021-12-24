import { createStore } from '@/store/createStore';
import { reducer } from '@/store/reducer';

const store = createStore(reducer);

export default store;
