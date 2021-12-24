import KanbanBoard from '@/component/KanbanBoard';

const App = {
  init: () => new KanbanBoard('#root'),
};

document.addEventListener('DOMContentLoaded', App.init());
