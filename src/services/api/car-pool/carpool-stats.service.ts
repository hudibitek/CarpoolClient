import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelNotImplemented } from 'core/models/web/entity/model-not-implemented';
import { PoolEntityService } from 'core/services/poolEntity.service';
import { ICarpoolStatsModel } from 'models/api/carpool-stats-model';

@Injectable({
  providedIn: 'root'
})
export class CarpoolStatsService extends PoolEntityService<ICarpoolStatsModel, ModelNotImplemented, ModelNotImplemented> {
  constructor(serviceHttpClient: HttpClient) {
    super(serviceHttpClient, 'carpoolstats');
  }
}
