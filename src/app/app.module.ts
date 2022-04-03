import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeHr from '@angular/common/locales/hr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderService } from 'services/app/http-loader.service';
import { SnackBarService } from 'services/app/snack-bar.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatusComponent } from './components/status/status.component';
import { LoaderInterceptor } from './interceptors/loader-interceptor';
import { LayoutsModule } from './layouts/layouts.module';
import { PipesModule } from './pipes/pipes.module';
import { ErrorsModule } from './redirect-pages/errors/errors.module';
import { SharedModule } from './shared/shared.module';
import { SubcomponentsModule } from './subcomponents/subcomponents.module';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent
  ],
  imports: [
    SubcomponentsModule,
    PipesModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutsModule,
    AppRoutingModule,
    HttpClientModule,
    ErrorsModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    CommonModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'hr'
    },
    SnackBarService,
    LoaderService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    registerLocaleData(localeHr, 'hr');

    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');

    matIconRegistry.addSvgIcon('classic',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/classic.svg')
    );
    matIconRegistry.addSvgIcon('toolbar',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/toolbar.svg')
    );
    matIconRegistry.addSvgIcon('compact',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/compact.svg')
    );
    matIconRegistry.addSvgIcon('boxed',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/boxed.svg')
    );
    matIconRegistry.addSvgIcon('funky',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/funky.svg')
    );
    matIconRegistry.addSvgIcon('tabbed',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/tabbed.svg')
    );
  }
}
