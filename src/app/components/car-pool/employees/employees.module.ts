import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { moduleGenericPaths } from 'app/app-urls';
import { PipesModule } from 'app/pipes/pipes.module';
import { SharedModule } from 'app/shared/shared.module';
import { SubcomponentsModule } from 'app/subcomponents/subcomponents.module';
import { EmployeesListComponent } from './employees-list/employees-list.component';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    SharedModule,
    SubcomponentsModule,
    RouterModule.forChild([
      {
        path: moduleGenericPaths.list,
        component: EmployeesListComponent
      }
    ])
  ],
  declarations: [
    EmployeesListComponent
  ]
})
export class EmployeesModule { }
