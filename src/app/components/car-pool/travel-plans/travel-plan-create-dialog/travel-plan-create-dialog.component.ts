import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ValidationErrorHelper } from 'core/helpers/validation-error-helper';
import { IKoerAlertData } from 'core/models/web/koer-alert-data';
import { ITravelPlanCreateModel } from 'models/api/travel-plan-create-model';
import { CarsService } from 'services/api/car-pool/cars.service';
import { EmployeesService } from 'services/api/car-pool/employees.service';
import { TravelPlansService } from 'services/api/car-pool/travel-plans.service';

@Component({
  selector: 'app-travel-plan-create-dialog',
  templateUrl: './travel-plan-create-dialog.component.html',
  styleUrls: ['./travel-plan-create-dialog.component.scss']
})
export class TravelPlanCreateDialogComponent implements OnInit {
  form: FormGroup;
  koerAlertData: IKoerAlertData;

  constructor(
    public dialogRef: MatDialogRef<TravelPlanCreateDialogComponent>,
    public carsService: CarsService,
    public employeesService: EmployeesService,
    private travelPlansService: TravelPlansService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      startLocation: [],
      endLocation: [],
      startDate: [],
      endDate: [],
      carId: [],
      driverId: []
    });
  }

  onCreateClick(): void {
    const model = <ITravelPlanCreateModel>{};
    Object.assign(model, this.form.value);
    this.travelPlansService.create(model).subscribe(
      response => {
        this.dialogRef.close(response.body.data);
      },
      error => {
        this.koerAlertData = { message: ValidationErrorHelper.handleResponseError(error, this.form) };
      });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  public filterEmployees = (request: any): any => {
    return { onlyDrivers: true };
  };
}
