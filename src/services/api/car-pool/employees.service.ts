import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelNotImplemented } from 'core/models/web/entity/model-not-implemented';
import { PoolEntityService } from 'core/services/poolEntity.service';
import { IEmployeeModel } from 'models/api/employee-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends PoolEntityService<IEmployeeModel, ModelNotImplemented, ModelNotImplemented> {
  constructor(serviceHttpClient: HttpClient) {
    super(serviceHttpClient, 'employees');
  }
}
