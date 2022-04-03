import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// use the require method provided by webpack
// declare const require;

if (environment.production) {
  enableProdMode();
}

const compilerOptions: any = {};

platformBrowserDynamic()
  .bootstrapModule(AppModule, compilerOptions)
  .catch(err => console.log(err));
