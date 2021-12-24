import KanbanBoard from '@/component/KanbanBoard';
import '@/style/index.css';

const App = {
  init: () => new KanbanBoard('#root'),
};

document.addEventListener('DOMContentLoaded', App.init());
