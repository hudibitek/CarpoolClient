import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorPageRedirect } from 'core/helpers/error-page-redirect';
import { UrlHelper } from 'core/helpers/url-helper';
import { ValidationErrorHelper } from 'core/helpers/validation-error-helper';
import { IKoerAlertData } from 'core/models/web/koer-alert-data';
import { ITravelPlanUpdateModel } from 'models/api/travel-plan-update-model';
import { CarsService } from 'services/api/car-pool/cars.service';
import { EmployeesService } from 'services/api/car-pool/employees.service';
import { TravelPlansService } from 'services/api/car-pool/travel-plans.service';
import { SnackBarService } from 'services/app/snack-bar.service';

@Component({
  selector: 'app-travel-plan-edit',
  templateUrl: './travel-plan-edit.component.html',
  styleUrls: ['./travel-plan-edit.component.scss']
})

export class TravelPlanEditComponent implements OnInit {
  private travelPlanId: string;
  public form: FormGroup;
  public koerAlertData: IKoerAlertData;

  constructor(
    public carsService: CarsService,
    public employeesService: EmployeesService,
    private travelPlansService: TravelPlansService,
    private route: ActivatedRoute,
    private router: Router,
    public urlHelper: UrlHelper,
    private snackBar: SnackBarService,
    private fb: FormBuilder
  ) {
    this.travelPlanId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      startLocation: [],
      endLocation: [],
      startDate: [],
      endDate: [],
      driverId: [],
      carId: []
    });

    this.travelPlansService.get(this.travelPlanId).subscribe(
      response => {
        const travelPlan = response.body.data;
        this.form.patchValue(travelPlan);
      },
      error => {
        ErrorPageRedirect.forEntityLoadError(this.router);
      }
    );
  }

  onSaveClick(): void {
    const model = <ITravelPlanUpdateModel>{};
    Object.assign(model, this.form.value);
    model.id = this.travelPlanId;
    this.travelPlansService.update(model).subscribe(
      response => {
        this.router.navigateByUrl(this.urlHelper.getUrl('travel-plan-view', this.travelPlanId)).then(() => {
          this.snackBar.open('Travel plan updated.');
        });
      },
      error => {
        this.koerAlertData = { message: ValidationErrorHelper.handleResponseError(error, this.form) };
      });
  }

  onCancelClick(): void {
    this.router.navigateByUrl(this.urlHelper.getUrl('travel-plan-view', this.travelPlanId));
  }

  public filterEmployees = (request: any): any => {
    return { onlyDrivers: true };
  };
}
