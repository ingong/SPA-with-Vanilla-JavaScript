export const qs = (selector, scope = document) => {
  if (!selector) throw 'no selector';
  return scope.querySelector(selector);
};

export const qsAll = (selector, scope = document) => {
  if (!selector) throw 'no selector';
  return Array.from(scope.querySelectorAll(selector));
};

export const getNewDateString = () => {
  const dateString = new Date().toLocaleString('en-US', { hour12: false });
  const [date, time] = dateString.split(',');
  const newFormatDate = [date.split('/').slice(2), date.split('/').slice(0, 2)].flat();
  return newFormatDate + time;
};
