import { Component, OnInit } from '@angular/core';
import { UrlHelper } from 'core/helpers/url-helper';
import { IKoerAlertData } from 'core/models/web/koer-alert-data';
import { ICarModel } from 'models/api/car-model';
import { EmployeesService } from 'services/api/car-pool/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  public cars: ICarModel[];
  public koerAlertData: IKoerAlertData;

  constructor(
    public urlHelper: UrlHelper,
    public employeesService: EmployeesService
  ) {
  }

  ngOnInit(): void {
  }
}
