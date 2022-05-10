import Entry from '@/pages/Entry';
import KanbanBoard from '@/pages/KanbanBoard/components/Board';
import LanguageSearchPage from '@/pages/LanguageSearch/LanguageSearchPage';
import AnimationPage from '@/pages/Animation/AnimationPage';

import { storeInit, store } from '@/pages/KanbanBoard/store';
import localDB from '@/pages/KanbanBoard/db';
import { qs } from '@/pages/KanbanBoard/utils/helper';

const routes = [
  { path: '/', view: Entry },
  { path: '/board', view: KanbanBoard },
  { path: '/search', view: LanguageSearchPage },
  { path: '/animation', view: AnimationPage },
];

export const router = async () => {
  let match = routes.find((v) => v.path === location.pathname);
  if (qs('#root').firstElementChild) qs('#root').replaceChildren();

  switch (match.path) {
    case '/':
      new match.view('#root', {
        children: [
          { name: 'Kanban Board', route: 'board' },
          { name: 'Language Search', route: 'search' },
          { name: 'Animation', route: 'animation' },
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
    case '/animation':
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
