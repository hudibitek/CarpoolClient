import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UrlHelper } from 'core/helpers/url-helper';
import { ValidationErrorHelper } from 'core/helpers/validation-error-helper';
import { IHttpFilterResponseModel } from 'core/models/web/entity/http-filter-response-model';
import { IKoerAlertData } from 'core/models/web/koer-alert-data';
import { PoolEntityService } from 'core/services/poolEntity.service';
import * as _ from 'lodash';
import { IDataTableColumn } from 'models/app/subcomponents/data-table-column';
import { IDataTableTemplate } from 'models/app/subcomponents/data-table-template';
import { interval } from 'rxjs/internal/observable/interval';
import { Subject } from 'rxjs/internal/Subject';
import { debounce } from 'rxjs/operators';

@Component({
  selector: 'koer-data-table',
  templateUrl: './koer-data-table.component.html',
  styleUrls: ['./koer-data-table.component.scss']
})
export class KoerDataTableComponent implements OnInit {
  readonly defaults: any = {
    pageIndex: 0,
    pageSize: 20,
    pageSizeOptions: [10, 20, 30, 50, 100]
  };

  readonly defaultReloadDebouncerSleep: number = 1000;

  @Input() columns: IDataTableColumn[];
  @Input() service: PoolEntityService<object, object, object>;
  @Input() parentId: string;
  @Input() parentIdValue: string;
  @Input() select: string[];
  @Input() displayCellFunc: any;
  @Input() sortBy: string[];
  @Input() searchByProperties: string[];
  @Input() createFilterRequestFunc: any;
  @Input() columnsTemplates: IDataTableTemplate<Component> = {};
  @Input() disableSort: string[] = [];
  @Input() rowClickRedirectUrl: string = null;
  @Input() rowClickRedirectCallback: (rowClickRedirectParam: any) => void;
  @Input() rowClickRedirectParam: string = 'id';
  @Input() autoload: boolean = true;

  private _filterResponse: IHttpFilterResponseModel<object>;
  get filterResponse(): IHttpFilterResponseModel<object> {
    return this._filterResponse;
  }
  set filterResponse(value: IHttpFilterResponseModel<object>) {
    this._filterResponse = value;
    this.dataSource.data = value?.data;
  }

  public defaultSortHeader: string;
  public defaultSortDirection: string;
  public dataSource: MatTableDataSource<object> = new MatTableDataSource();
  public lodash: any = _;
  private reloadDebouncer: Subject<number> = new Subject<number>();
  isLoading: boolean;
  koerAlertData: IKoerAlertData;

  get displayedColumns(): any[] {
    return this.columns.map(c => c.header);
  }

  @ViewChild('paginator', { static: true }) matPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private urlHelper: UrlHelper
  ) { }

  ngOnInit(): void {
    if ((!this.parentId && this.parentIdValue) || (this.parentId && !this.parentIdValue)) {
      throw new Error('Error: Inputs "parentProperty" and "parentValue" must be set both or not set at all.');
    }

    if (!this.sortBy || this.sortBy.length === 0) {
      throw new Error('Error: Input "sortBy" must be set.');
    }

    this.defaultSortDirection = 'asc';

    this.reloadDebouncer.pipe(debounce<number>((sleep) => interval(sleep))).subscribe(() => {
      this.reload();
    });

    if (this.autoload) {
      this.reload();
    }
  }

  onRowClick(row: any): void {
    if (this.rowClickRedirectCallback != null) {
      this.rowClickRedirectCallback(this.lodash.get(row, this.rowClickRedirectParam));
    } else if (this.rowClickRedirectUrl) {
      this.router.navigateByUrl(
        this.urlHelper.getUrl(this.rowClickRedirectUrl, this.lodash.get(row, this.rowClickRedirectParam))
      );
    }
  }

  reloadWithDebouncer(): void {
    this.isLoading = true;
    this.reloadDebouncer.next(this.defaultReloadDebouncerSleep);
  }

  isColumnSortable(header: string): boolean {
    return !this.disableSort.some(s => s === header);
  }

  public clearTable(): void {
    this.filterResponse = null;
    this.koerAlertData = { message: '' };
    this.matPaginator.pageIndex = this.defaults.pageIndex;
    this.matPaginator.pageSize = this.defaults.pageSize;
  }

  public reload(): void {
    this.clearTable();
    this.loadEntity();
  }

  public onSearchEvent(): void {
    this.loadEntity();
  }

  private loadEntity(): void {
    this.koerAlertData = { message: '' };
    this.isLoading = true;

    let request = {};
    if (this.createFilterRequestFunc) {
      request = this.createFilterRequestFunc();
      if (request == null) {
        this.isLoading = false;
        return;
      }
    }

    this.service.filter(request).subscribe(
      response => {
        this.isLoading = false;
        this.filterResponse = response.body;
      },
      error => {
        this.isLoading = false;
        this.koerAlertData = { message: ValidationErrorHelper.handleResponseError(error) };
      }
    );
  }
}
