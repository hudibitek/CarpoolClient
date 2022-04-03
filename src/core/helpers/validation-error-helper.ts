import { Injector } from '@angular/core';
import { AbstractControl, FormGroup, NgControl } from '@angular/forms';
import { HttpStatusCodes } from 'core/models/web/http-status-codes';

export class ValidationErrorHelper {
  static getFormControlForPath(path: string, form: FormGroup): AbstractControl | null {
    if (!path) {
      return null;
    }

    const control = form.get(path);
    if (control) {
      return control;
    }

    if (!path.includes('.')) {
      return null;
    }

    const properties = path.split('.');
    properties.pop();
    path = properties.join('.');
    return this.getFormControlForPath(path, form);
  }

  static handleResponseError(response: any, form?: FormGroup): string {
    if (response && response.status === HttpStatusCodes.BadRequest && response?.error?.errors && form) {
      form.markAllAsTouched();
      const errors = response.error.errors;
      let mismatchedErrors = [];
      const keys = Object.keys(errors);
      keys.forEach(key => {
        const control = this.getFormControlForPath(key, form);
        if (control) {
          control.setErrors(errors[key].concat(control.errors));
        } else {
          mismatchedErrors = mismatchedErrors.concat(errors[key]);
        }
      });

      if (mismatchedErrors.length > 0) {
        form.setErrors(mismatchedErrors);
      }

      return null;
    } else if (response && (response.status === HttpStatusCodes.Forbidden || response.status === HttpStatusCodes.BadRequest) && response?.error?.errors) {
      const errors = response.error.errors;
      const key = Object.keys(errors)[0];

      return errors[key];
    }

    return 'An unhandled exception occurred while processing the request.';
  }

  static getValidationField(injector: Injector, validationFieldPrefix: string, validationFieldSuffix: string): string {
    const ngControl: NgControl = injector.get(NgControl, null);
    if (ngControl) {
      return [validationFieldPrefix, ngControl.name.toString(), validationFieldSuffix].filter(i => i).join('.');
    }
    return null;
  }
}
