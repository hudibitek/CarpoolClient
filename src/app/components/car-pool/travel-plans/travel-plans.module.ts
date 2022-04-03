import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { moduleGenericPaths } from 'app/app-urls';
import { PipesModule } from 'app/pipes/pipes.module';
import { SharedModule } from 'app/shared/shared.module';
import { SubcomponentsModule } from 'app/subcomponents/subcomponents.module';
import { TravelPlanAddEmployeeDialogComponent } from './travel-plan-add-employee-dialog/travel-plan-add-employee-dialog.component';
import { TravelPlanCreateDialogComponent } from './travel-plan-create-dialog/travel-plan-create-dialog.component';
import { TravelPlanEditComponent } from './travel-plan-edit/travel-plan-edit.component';
import { TravelPlanViewComponent } from './travel-plan-view/travel-plan-view.component';
import { TravelPlansListComponent } from './travel-plans-list/travel-plans-list.component';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    SharedModule,
    SubcomponentsModule,
    NgxMatDatetimePickerModule,
    RouterModule.forChild([
      {
        path: moduleGenericPaths.list,
        component: TravelPlansListComponent
      },
      {
        path: moduleGenericPaths.view,
        component: TravelPlanViewComponent
      },
      {
        path: moduleGenericPaths.edit,
        component: TravelPlanEditComponent
      }
    ])
  ],
  declarations: [
    TravelPlansListComponent,
    TravelPlanCreateDialogComponent,
    TravelPlanAddEmployeeDialogComponent,
    TravelPlanViewComponent,
    TravelPlanEditComponent
  ]
})
export class TravelPlansModule { }
