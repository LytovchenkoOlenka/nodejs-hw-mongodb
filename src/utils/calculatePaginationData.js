export const calculatePaginationData = (countContacts, perPage, page) => {
  const totalPages = Math.ceil(countContacts / perPage);
  const hasNextPage = Boolean(totalPages - page);
  const hasPreviousPage = page !== 1;

  return {
    page,
    perPage,
    totalItems: countContacts,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
