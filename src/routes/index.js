import KanbanBoard from '@/components/KanbanBoard';
import { storeInit, store } from '@/store';
import localDB from '@/db';

const getURLParams = (url) => {
  const result = {};
  url.replace(/[?&]{1}([^=&#]+)=([^&#]*)/g, function (s, k, v) {
    result[k] = decodeURIComponent(v);
  });
  return result;
};
const pathToRegex = (path) => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');
const routes = [{ path: '/', view: KanbanBoard }];

export const movePage = (url) => {
  history.pushState(null, null, url);
  router();
};

export const router = async () => {
  const pageMatches = routes.map((route) => {
    return {
      route,
      isMatch: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = pageMatches.find((pageMatch) => pageMatch.isMatch);
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  } else {
    const result = localDB.get();
    switch (match.route.path) {
      case '/':
        store.dispatch(storeInit(result));
        new match.route.view('#root');
        break;
      default:
        return;
    }
  }
};
