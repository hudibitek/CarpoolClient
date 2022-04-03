import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from 'app/layouts/directives/click-outside.directive';
import { PipesModule } from 'app/pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { KoerAlertMessageComponent } from './koer-alert-message/koer-alert-message.component';
import { KoerDataTableComponent } from './koer-data-table/koer-data-table.component';
import { KoerDropdownComponent } from './koer-dropdown/koer-dropdown.component';
import { KoerMessageBoxDialogComponent } from './koer-message-box-dialog/koer-message-box-dialog.component';
import { KoerOptionsButtonComponent } from './koer-options-button/koer-options-button.component';
import { KoerPageHeaderComponent } from './koer-page-header/koer-page-header.component';
import { KoerValidationErrorsComponent } from './koer-validation-errors/koer-validation-errors.component';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    SharedModule,
    RouterModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  exports: [
    ClickOutsideDirective,
    KoerDataTableComponent,
    KoerAlertMessageComponent,
    KoerOptionsButtonComponent,
    KoerPageHeaderComponent,
    KoerDropdownComponent,
    KoerMessageBoxDialogComponent,
    KoerValidationErrorsComponent
  ],
  declarations: [
    ClickOutsideDirective,
    KoerDataTableComponent,
    KoerAlertMessageComponent,
    KoerOptionsButtonComponent,
    KoerPageHeaderComponent,
    KoerDropdownComponent,
    KoerMessageBoxDialogComponent,
    KoerValidationErrorsComponent
  ]
})
export class SubcomponentsModule { }
