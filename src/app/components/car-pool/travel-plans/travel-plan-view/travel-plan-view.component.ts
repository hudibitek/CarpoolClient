import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { KoerDataTableComponent } from 'app/subcomponents/koer-data-table/koer-data-table.component';
import { KoerMessageBoxDialogComponent } from 'app/subcomponents/koer-message-box-dialog/koer-message-box-dialog.component';
import { ErrorPageRedirect } from 'core/helpers/error-page-redirect';
import { UrlHelper } from 'core/helpers/url-helper';
import { ValidationErrorHelper } from 'core/helpers/validation-error-helper';
import { IKoerAlertData } from 'core/models/web/koer-alert-data';
import { ITravelPlanEmployeeModel } from 'models/api/travel-plan-employee-model';
import { ITravelPlanModel } from 'models/api/travel-plan-model';
import { IOptionLink } from 'models/app/subcomponents/option-link';
import { TravelPlanEmployeesService } from 'services/api/car-pool/travel-plan-employees.service';
import { TravelPlansService } from 'services/api/car-pool/travel-plans.service';
import { SnackBarService } from 'services/app/snack-bar.service';
import { TravelPlanAddEmployeeDialogComponent } from '../travel-plan-add-employee-dialog/travel-plan-add-employee-dialog.component';

@Component({
  selector: 'app-travel-plan-view',
  templateUrl: './travel-plan-view.component.html',
  styleUrls: ['./travel-plan-view.component.scss']
})

export class TravelPlanViewComponent implements OnInit {
  @ViewChild(KoerDataTableComponent) passengersTable: KoerDataTableComponent;

  public travelPlanId: string;
  public travelPlan: ITravelPlanModel;
  public optionLinks: IOptionLink[];
  public passengersOptionLinks: IOptionLink[];
  public koerAlertData: IKoerAlertData;

  constructor(
    private travelPlansService: TravelPlansService,
    public travelPlanEmployeesService: TravelPlanEmployeesService,
    private route: ActivatedRoute,
    private router: Router,
    public urlHelper: UrlHelper,
    private dialog: MatDialog,
    private snackBar: SnackBarService
  ) {
    this.travelPlanId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.optionLinks = [
      {
        label: 'Edit',
        link: this.urlHelper.getUrl('travel-plan-edit', this.travelPlanId)
      },
      {
        label: 'Delete',
        clickFunc: () => this.openDeleteTravelPlanDialog()
      }
    ];

    this.passengersOptionLinks = [
      {
        label: 'Delete',
        clickFunc: (context: ITravelPlanEmployeeModel) => this.openDeletePassengerDialog(context)
      }
    ];


    this.travelPlansService.get(this.travelPlanId).subscribe(
      response => {
        this.travelPlan = response.body.data;
      },
      error => {
        ErrorPageRedirect.forEntityLoadError(this.router);
      }
    );
  }

  openDeletePassengerDialog(passenger: ITravelPlanEmployeeModel): void {
    this.dialog.open(KoerMessageBoxDialogComponent, {
      width: '500px',
      data: {
        title: 'Delete Passenger ' + passenger.employee.name,
        message: 'Are you sure you want to delete this Passenger?',
        buttons: [
          { text: 'Delete', onClick: () => this.deletePassenger(passenger.id) },
          { text: 'Cancel' }
        ]
      }
    });
  }

  deletePassenger(passengerId: string): void {
    this.travelPlanEmployeesService.delete(passengerId).subscribe(
      response => {
        this.passengersTable.reload();
        this.snackBar.open('Passenger removed.');
      },
      error => {
        this.koerAlertData = { message: ValidationErrorHelper.handleResponseError(error) };
      });
  }

  openAddPassengerDialog(): void {
    const dialog = this.dialog.open(TravelPlanAddEmployeeDialogComponent, {
      width: '500px',
      data: this.travelPlanId
    });

    dialog.afterClosed().subscribe(
      property => {
        if (property) {
          this.passengersTable.reload();
          this.snackBar.open('Passenger added.');
        } else {
          // Dialog closed manually
        }
      });
  }

  openDeleteTravelPlanDialog(): void {
    this.dialog.open(KoerMessageBoxDialogComponent, {
      width: '500px',
      data: {
        title: 'Delete Travel plan',
        message: 'Are you sure you want to delete this Travel plan?',
        buttons: [
          { text: 'Delete', onClick: () => this.deleteTravelPlan() },
          { text: 'Cancel' }
        ]
      }
    });
  }

  public deleteTravelPlan(): void {
    this.travelPlansService.delete(this.travelPlanId).subscribe(
      response => {
        this.router.navigate([this.urlHelper.getUrl('travel-plans-list')]).then(() => {
          this.snackBar.open('Travel plan deleted.');
        });
      },
      error => {
        this.koerAlertData = { message: ValidationErrorHelper.handleResponseError(error) };
      });
  }

  tableFilterFunc = (): any => {
    return { travelPlanId: this.travelPlanId };
  };
}
