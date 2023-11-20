export const showReviewItems = (
  index: number,
  page: number,
  reviewPerPage: number,
  pagination: boolean
): boolean => {
  return !pagination
    ? true
    : index >= (page - 1) * reviewPerPage && index < page * reviewPerPage;
};
