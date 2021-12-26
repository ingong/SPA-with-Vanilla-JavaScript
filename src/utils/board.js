export const getMaxOrder = (itemList, status) => {
  const filterList = itemList.filter((item) => item.status === status);
  const maxOrder = filterList.length > 0 ? Math.max(...filterList.map((item) => item.order)) : -1;
  return maxOrder;
};
