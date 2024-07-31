import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  if ([SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder)) {
    return sortOrder;
  }
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const keys = ['_id', 'name', 'contactType', 'createdAt'];
  if (keys.includes(sortBy)) {
    return sortBy;
  }
  return '_id';
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
