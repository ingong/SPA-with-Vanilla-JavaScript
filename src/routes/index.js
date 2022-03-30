import KanbanBoard from '@/components/KanbanBoard';
import Entry from '@/components/Entry';
import { storeInit, store } from '@/store';
import localDB from '@/db';
import { qs } from '@/utils/helper';

const routes = [
  { path: '/', view: Entry },
  { path: '/board', view: KanbanBoard },
  { path: '/search', view: KanbanBoard },
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
      break;
    default:
      return;
  }
};

export const movePage = (url) => {
  history.pushState(null, null, url);
  router();
};

const getURLParams = (url) => {
  const result = {};
  url.replace(/[?&]{1}([^=&#]+)=([^&#]*)/g, function (s, k, v) {
    result[k] = decodeURIComponent(v);
  });
  return result;
};
