import { IReportTableModel } from 'app/components/reports/table/report-table-model';
import { TableReportQueryParams } from 'app/components/reports/table/table-report-query-params';
import { IReportTableFilterModel } from 'app/components/reports/table/report-table-filter-model';

export class TableReportHelper {
  static buildQueryParams(accountId: string, filter: IReportTableFilterModel, properties: IReportTableModel[]): {} {
    const queryParams = <any>{};
    queryParams[TableReportQueryParams.AccountId] = accountId;
    queryParams[TableReportQueryParams.Filter] = JSON.stringify(filter);
    if (properties.length > 0) {
      queryParams[TableReportQueryParams.Properties] = JSON.stringify(properties);
    }

    return queryParams;
  }
}
