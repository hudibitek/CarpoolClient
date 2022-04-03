import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidationErrorHelper } from 'core/helpers/validation-error-helper';
import { IKoerAlertData } from 'core/models/web/koer-alert-data';
import { ITravelPlanEmployeeCreateModel } from 'models/api/travel-plan-employee-create-model';
import { CarsService } from 'services/api/car-pool/cars.service';
import { EmployeesService } from 'services/api/car-pool/employees.service';
import { TravelPlanEmployeesService } from 'services/api/car-pool/travel-plan-employees.service';

@Component({
  selector: 'app-travel-plan-add-employee-dialog',
  templateUrl: './travel-plan-add-employee-dialog.component.html',
  styleUrls: ['./travel-plan-add-employee-dialog.component.scss']
})
export class TravelPlanAddEmployeeDialogComponent implements OnInit {
  form: FormGroup;
  koerAlertData: IKoerAlertData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public travelPlanId: string,
    public dialogRef: MatDialogRef<TravelPlanAddEmployeeDialogComponent>,
    public carsService: CarsService,
    public employeesService: EmployeesService,
    private travelPlanEmployeesService: TravelPlanEmployeesService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: []
    });
  }

  onCreateClick(): void {
    const model = <ITravelPlanEmployeeCreateModel>{};
    model.travelPlanId = this.travelPlanId;
    Object.assign(model, this.form.value);
    this.travelPlanEmployeesService.create(model).subscribe(
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
