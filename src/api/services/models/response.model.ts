export interface ResponseWrapper<T = any> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: Pagination<T>;
}

export interface Pagination<T = any> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[];
}
