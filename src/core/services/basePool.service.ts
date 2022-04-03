import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ServiceHelper } from 'core/helpers/service-helper';
import { IHttpFilterResponseModel } from 'core/models/web/entity/http-filter-response-model';
import { environment } from 'environments/environment';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

export abstract class BasePoolService<TModel> {
  constructor(protected httpClient: HttpClient, protected apiControllerName: string) { }
  protected getServiceUrl(id?: string): string {
    let url = `${environment.baseApiUrl}/${this.apiControllerName}`;
    if (id != null) {
      url = `${url}/${id}`;
    }
    return url;
  }

  protected sendFilterRequest(filter: any, urlRelative: string, hideLoadingBar: boolean = false): Observable<HttpResponse<IHttpFilterResponseModel<TModel>>> {
    const options = {
      headers: ServiceHelper.createHeader()
    };
    if (hideLoadingBar) {
      options.headers = options.headers.append('x-koer-hide-loading-bar', 'true');
    }

    return this.httpClient.post<IHttpFilterResponseModel<TModel>>(
      this.getServiceUrl() + urlRelative,
      filter || {},
      {
        headers: options.headers,
        observe: 'response'
      })
      .pipe(catchError(this.handleError));
  }

  public filter(filter: any = null, hideLoadingBar: boolean = false): Observable<HttpResponse<IHttpFilterResponseModel<TModel>>> {
    return this.sendFilterRequest(filter, '/filter', hideLoadingBar);
  }

  protected handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(err);
  }
}
