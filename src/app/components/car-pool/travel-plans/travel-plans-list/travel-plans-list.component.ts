import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UrlHelper } from 'core/helpers/url-helper';
import { IKoerAlertData } from 'core/models/web/koer-alert-data';
import { ITravelPlanModel } from 'models/api/travel-plan-model';
import { TravelPlansService } from 'services/api/car-pool/travel-plans.service';
import { SnackBarService } from 'services/app/snack-bar.service';
import { TravelPlanCreateDialogComponent } from '../travel-plan-create-dialog/travel-plan-create-dialog.component';

@Component({
  selector: 'app-travel-plans-list',
  templateUrl: './travel-plans-list.component.html',
  styleUrls: ['./travel-plans-list.component.scss']
})
export class TravelPlansListComponent implements OnInit {
  public travelPlans: ITravelPlanModel[];
  public koerAlertData: IKoerAlertData;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private snackBar: SnackBarService,
    public urlHelper: UrlHelper,
    public travelPlansService: TravelPlansService
  ) {
  }

  ngOnInit(): void {
  }

  openTravelPlanCreateDialog(): void {
    const dialog = this.dialog.open(TravelPlanCreateDialogComponent, {
      width: '500px'
    });

    dialog.afterClosed().subscribe(
      travelPlanId => {
        if (travelPlanId) {
          this.router.navigateByUrl(this.urlHelper.getUrl('travel-plan-view', travelPlanId));
        } else {
          // Dialog closed manually
        }
      },
      error => {
        this.snackBar.open('Error occurred while creating Travel plan.');
      });
  }
}
