import { DatePipe, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { KoerDatePipe } from './koer-date-pipe';

@NgModule({
  providers: [
    KoerDatePipe,
    TitleCasePipe,
    DatePipe
  ],
  declarations: [
    KoerDatePipe
  ],
  exports: [
    KoerDatePipe
  ]
})
export class PipesModule { }
