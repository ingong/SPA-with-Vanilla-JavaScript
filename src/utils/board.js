export const getMaxOrder = (itemList, status) => {
  const filterList = itemList.filter((item) => item.status === status);
  const maxOrder = filterList.length > 0 ? Math.max(...filterList.map((item) => item.order)) : -1;
  return maxOrder;
};

export const getNewOrder = (itemList, targetStatus, targetId) => {
  const filteredItemList = itemList
    .filter((item) => item.status === targetStatus)
    .sort((a, b) => a.order - b.order);
  const upperIndexNearDropArea = filteredItemList.findIndex((item) => item.id === targetId);
  const itemsNearDropArea = filteredItemList.slice(
    upperIndexNearDropArea,
    upperIndexNearDropArea + 2,
  );

  if (itemsNearDropArea.length === 1) return itemsNearDropArea[0].order + 1;
  else if (itemsNearDropArea.length === 2) {
    const orderSum = itemsNearDropArea.map((item) => item.order).reduce((acc, cur) => acc + cur, 0);
    return orderSum / 2;
  }
};

export const isValidClick = (classList, tagList, target) => {
  if (classList.includes(target.className) || tagList.includes(target.tagName)) return true;
};
