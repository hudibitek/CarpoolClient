import { Component, OnInit } from '@angular/core';
import { UrlHelper } from 'core/helpers/url-helper';
import { IKoerAlertData } from 'core/models/web/koer-alert-data';
import { ICarModel } from 'models/api/car-model';
import { CarsService } from 'services/api/car-pool/cars.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit {
  public cars: ICarModel[];
  public koerAlertData: IKoerAlertData;

  constructor(
    public urlHelper: UrlHelper,
    public carsService: CarsService
  ) {
  }

  ngOnInit(): void {
  }
}
