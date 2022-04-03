import { TemplateRef } from '@angular/core';

export interface IDataTableTemplate<T> {
  [columnName: string]: TemplateRef<T>;
}
