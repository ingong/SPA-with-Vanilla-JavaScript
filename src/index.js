import KanbanBoard from '@/components/KanbanBoard';
import '@/style/index.css';
import { storeInit, store } from '@/store';
import localDB from '@/db';

const App = {
  init: async () => {
    try {
      const result = await localDB.get();
      store.dispatch(storeInit(result));
      new KanbanBoard('#root');
    } catch (error) {
      console.log(error);
    }
  },
};

document.addEventListener('DOMContentLoaded', App.init());
