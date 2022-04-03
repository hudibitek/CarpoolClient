import { HttpResponse } from '@angular/common/http';
import { ServiceHelper } from 'core/helpers/service-helper';
import { IHttpCreateResponseModel } from 'core/models/web/entity/http-create-response-model';
import { IHttpGetResponseModel } from 'core/models/web/entity/http-get-response-model';
import { ModelNotImplemented } from 'core/models/web/entity/model-not-implemented';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { BasePoolService } from './basePool.service';

export abstract class PoolEntityService<TModel, TCreateModel, TUpdateModel> extends BasePoolService<TModel> {
  public get(id: string): Observable<HttpResponse<IHttpGetResponseModel<TModel>>> {
    return this.httpClient
      .get<IHttpGetResponseModel<TModel>>(
        this.getServiceUrl(id),
        {
          headers: ServiceHelper.createHeader(),
          observe: 'response'
        }
      )
      .pipe(catchError(this.handleError));
  }

  public create(model: TCreateModel): Observable<HttpResponse<IHttpCreateResponseModel>> {
    if (typeof (model) === typeof (ModelNotImplemented)) {
      throw new Error('Error: Create request for ModelNotImplemented.');
    }

    return this.httpClient
      .post<IHttpCreateResponseModel>(
        this.getServiceUrl(),
        model,
        {
          headers: ServiceHelper.createHeader(),
          observe: 'response'
        }
      )
      .pipe(catchError(this.handleError));
  }

  public update(model: TUpdateModel): Observable<HttpResponse<void>> {
    if (typeof (model) === typeof (ModelNotImplemented)) {
      throw new Error('Error: Update request for ModelNotImplemented.');
    }

    return this.httpClient
      .put<any>(
        this.getServiceUrl(),
        model,
        {
          headers: ServiceHelper.createHeader(),
          observe: 'response'
        }
      )
      .pipe(catchError(this.handleError));
  }

  public delete(id: string): Observable<HttpResponse<object>> {
    return this.httpClient.delete(
      this.getServiceUrl(id),
      {
        headers: ServiceHelper.createHeader(),
        observe: 'response'
      }
    )
      .pipe(catchError(this.handleError));
  }
}
