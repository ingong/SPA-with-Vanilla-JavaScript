import App from '@/App';

document.addEventListener('DOMContentLoaded', () => App.route());
window.addEventListener('popstate', () => App.route());
