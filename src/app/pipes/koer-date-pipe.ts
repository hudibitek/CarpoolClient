import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DateTimeHelper } from 'core/helpers/date-time-helper';
import { isDate } from 'moment';

@Pipe({
  name: 'koerDate'
})
export class KoerDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) { }

  transform(value: any, format?: string, timezone?: string, locale?: string): string {
    if (!value) {
      return '';
    }

    if (!isDate(value)) {
      value = DateTimeHelper.stringToDateUTC(value);
    }

    return this.datePipe.transform(value, format, timezone, locale);
  }
}
