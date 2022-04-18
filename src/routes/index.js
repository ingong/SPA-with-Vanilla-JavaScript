import Entry from '@/components/Entry';
import KanbanBoard from '@/components/KanbanBoard/Board';
import LanguageSearchPage from '@/components/LanguageSearch/LanguageSearchPage';

import { storeInit, store } from '@/store';
import localDB from '@/db';
import { qs } from '@/utils/helper';

const routes = [
  { path: '/', view: Entry },
  { path: '/board', view: KanbanBoard },
  { path: '/search', view: LanguageSearchPage },
];

export const router = async () => {
  let match = routes.find((v) => v.path === location.pathname);
  if (qs('#root').firstElementChild) qs('#root').removeChild(qs('#root').firstElementChild);

  switch (match.path) {
    case '/':
      new match.view('#root', {
        children: [
          { name: 'Kanban Board', route: 'board' },
          { name: 'Language Search', route: 'search' },
        ],
      });
      break;
    case '/board':
      new match.view('#root');
      store.dispatch(storeInit(localDB.get()));
      break;
    case '/search':
      new match.view('#root');
      break;
    default:
      return;
  }
};

export const movePage = (url) => {
  history.pushState(null, null, url);
  router();
};
