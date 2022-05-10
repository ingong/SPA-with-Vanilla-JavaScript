import data from '@/pages/KanbanBoard/db/data';

const localDB = {
  init: () => localDB.get(),
  get: () => (localStorage.length > 0 ? localDB.getLocalStorage() : localDB.getFileJSON()),
  getLocalStorage: () => {
    const result = [];
    Array.from(Object.keys(localStorage))
      .filter((key) => key !== 'lastId')
      .forEach((key) => {
        const item = localStorage.getItem(key);
        result.push(JSON.parse(item));
      });

    return result;
  },
  getFileJSON: () =>
    new Promise((resolve, reject) => {
      if (data) {
        localDB.set('lastId', data.lastId);
        data.itemList.forEach((value) => localDB.set(value.id, value));
        resolve(data.itemList);
      }
      reject(new Error('Cannot Import Data '));
    }),
  getLastId: () => +JSON.parse(localStorage.getItem('lastId')),
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  delete: (key) => localStorage.removeItem(key),
};

export default localDB;
