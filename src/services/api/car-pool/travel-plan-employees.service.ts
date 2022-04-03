import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelNotImplemented } from 'core/models/web/entity/model-not-implemented';
import { PoolEntityService } from 'core/services/poolEntity.service';
import { ITravelPlanEmployeeCreateModel } from 'models/api/travel-plan-employee-create-model';
import { ITravelPlanEmployeeModel } from 'models/api/travel-plan-employee-model';

@Injectable({
  providedIn: 'root'
})
export class TravelPlanEmployeesService extends PoolEntityService<ITravelPlanEmployeeModel, ITravelPlanEmployeeCreateModel, ModelNotImplemented> {
  constructor(serviceHttpClient: HttpClient) {
    super(serviceHttpClient, 'travelplanemployees');
  }
}
