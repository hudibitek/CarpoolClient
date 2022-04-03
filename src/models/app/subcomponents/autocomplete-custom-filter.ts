import { FilterRequest } from 'core/models/web/filter-request';

export interface IAutoCompleteCustomFilter {
  searchTerm: string;
  query: FilterRequest;
}
