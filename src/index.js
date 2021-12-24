import KanbanBoard from '@/component/KanbanBoard';
import '@/style/index.css';

const App = {
  init: () => new KanbanBoard('#root', ['TODO', 'IN_PROGRESS', 'DONE']),
};

document.addEventListener('DOMContentLoaded', App.init());
