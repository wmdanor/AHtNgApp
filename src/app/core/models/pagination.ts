export interface Pagination {
  limit: number;
  offset: number;
}

export interface PaginatedResult extends Pagination {
  count: number;
}
