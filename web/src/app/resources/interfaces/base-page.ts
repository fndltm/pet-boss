export interface BasePage<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
}
