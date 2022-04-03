import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelNotImplemented } from 'core/models/web/entity/model-not-implemented';
import { PoolEntityService } from 'core/services/poolEntity.service';
import { ITravelPlanModel } from 'models/api/travel-plan-model';

@Injectable({
  providedIn: 'root'
})
export class TravelPlansService extends PoolEntityService<ITravelPlanModel, ModelNotImplemented, ModelNotImplemented> {
  constructor(serviceHttpClient: HttpClient) {
    super(serviceHttpClient, 'travelplans');
  }
}
