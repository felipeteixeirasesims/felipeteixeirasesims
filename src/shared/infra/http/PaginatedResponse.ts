export type PaginatedResponse<T> = {
  data: T;
  pageCount: number;
  itemCount: number;
};
