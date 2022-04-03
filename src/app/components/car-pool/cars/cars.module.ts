import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { moduleGenericPaths } from 'app/app-urls';
import { PipesModule } from 'app/pipes/pipes.module';
import { SharedModule } from 'app/shared/shared.module';
import { SubcomponentsModule } from 'app/subcomponents/subcomponents.module';
import { CarsListComponent } from './cars-list/cars-list.component';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    SharedModule,
    SubcomponentsModule,
    RouterModule.forChild([
      {
        path: moduleGenericPaths.list,
        component: CarsListComponent
      }
    ])
  ],
  declarations: [
    CarsListComponent
  ]
})
export class CarsModule { }
