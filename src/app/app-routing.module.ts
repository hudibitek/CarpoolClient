import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { moduleGenericPaths, moduleNames, rootPaths } from './app-urls';
import { CarsModule } from './components/car-pool/cars/cars.module';
import { EmployeesModule } from './components/car-pool/employees/employees.module';
import { StatisticsModule } from './components/car-pool/statistics/statistics.module';
import { TravelPlansModule } from './components/car-pool/travel-plans/travel-plans.module';
import { StatusComponent } from './components/status/status.component';
import { LayoutClassicComponent } from './layouts/layout-classic/layout-classic.component';
import { Error404Component } from './redirect-pages/error-404/error-404.component';
import { ErrorComponent } from './redirect-pages/errors/error.component';

const routes: Routes = [
  {
    path: moduleGenericPaths.list,
    redirectTo: moduleNames.travelPlans,
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutClassicComponent,
    children: [
      {
        path: moduleNames.carpoolStats,
        loadChildren: () => StatisticsModule
      },
      {
        path: moduleNames.travelPlans,
        loadChildren: () => TravelPlansModule
      },
      {
        path: moduleNames.cars,
        loadChildren: () => CarsModule
      },
      {
        path: moduleNames.employees,
        loadChildren: () => EmployeesModule
      }
    ]
  },
  {
    path: rootPaths.status,
    component: StatusComponent
  },
  {
    path: rootPaths.error,
    component: ErrorComponent
  },
  {
    path: rootPaths.error_404,
    component: Error404Component
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
