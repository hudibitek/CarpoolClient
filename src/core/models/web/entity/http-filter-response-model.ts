import { IPagination } from '../pagination/pagination';

export interface IHttpFilterResponseModel<TModel> extends IPagination {
  data: TModel[] | undefined;
  filter: string;
}
