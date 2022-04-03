import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelNotImplemented } from 'core/models/web/entity/model-not-implemented';
import { PoolEntityService } from 'core/services/poolEntity.service';
import { ICarModel } from 'models/api/car-model';

@Injectable({
  providedIn: 'root'
})
export class CarsService extends PoolEntityService<ICarModel, ModelNotImplemented, ModelNotImplemented> {
  constructor(serviceHttpClient: HttpClient) {
    super(serviceHttpClient, 'cars');
  }
}
