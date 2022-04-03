import { HttpHeaders } from '@angular/common/http';

const optionHeaders = {
  'Content-Type': 'application/json; charset=utf-8'
};

export class ServiceHelper {
  static createHeader(): HttpHeaders {
    return new HttpHeaders(optionHeaders);
  }
}
