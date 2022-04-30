export interface pagination {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
}

export class PaginatedResult<T> {
  constructor(public data: T, public pagination: pagination) {
  }
}

export class PagingParams {
  constructor(public pageNumber = 1, public pageSize = 2) {
  }
}