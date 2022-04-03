import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { KoerDataTableComponent } from 'app/subcomponents/koer-data-table/koer-data-table.component';
import { ErrorPageRedirect } from 'core/helpers/error-page-redirect';
import { UrlHelper } from 'core/helpers/url-helper';
import { IKoerAlertData } from 'core/models/web/koer-alert-data';
import { ICarpoolStatsModel } from 'models/api/carpool-stats-model';
import { CarpoolStatsService } from 'services/api/car-pool/carpool-stats.service';
import { CarsService } from 'services/api/car-pool/cars.service';

@Component({
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html',
  styleUrls: ['./statistics-list.component.scss']
})
export class StatisticsListComponent implements OnInit {
  public month = new FormControl('1');
  public months = Array.from(Array(12).keys()).map(m => ++m);
  public years = Array.from(Array(5).keys()).map(m => m + 2018).reverse();
  public form: FormGroup;
  public carpoolStats: ICarpoolStatsModel[];
  public koerAlertData: IKoerAlertData;

  @ViewChild(KoerDataTableComponent) tableEvents: KoerDataTableComponent;

  constructor(
    public carpoolStatsService: CarpoolStatsService,
    private router: Router,
    public urlHelper: UrlHelper,
    public carsService: CarsService,
    public fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      year: [],
      month: []
    });

    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.tableEvents.reloadWithDebouncer();
      }
    });

    this.carpoolStatsService.filter({ year: 2022, month: 3 }).subscribe(
      response => {
        this.carpoolStats = response.body.data;
      },
      error => {
        ErrorPageRedirect.forEntityLoadError(this.router);
      }
    );
  }

  tableFilterFunc = (): any => {
    const month = this.form.get('month').value;
    const year = this.form.get('year').value;

    if (month == null || year == null) {
      return null;
    }

    return { month: month, year: year };
  };
}
