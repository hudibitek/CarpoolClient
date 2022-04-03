import { Router } from '@angular/router';
import { UrlHelper } from 'core/helpers/url-helper';
import { IError } from 'models/app/redirect-pages/error';

const defaultSkipLocationChange = true;

export class ErrorPageRedirect {
  static forLoginError(router: Router, errorMessage: string): void {
    const urlHelper = new UrlHelper();
    router.navigate([urlHelper.getUrl('error')], {
      skipLocationChange: false,
      state: <IError>{
        title: 'Login error',
        message: errorMessage,
        isSignInError: true
      }
    });
    throw new Error(JSON.stringify(errorMessage));
  }

  static forError(router: Router, title: string, message: string): void {
    const urlHelper = new UrlHelper();
    router.navigate([urlHelper.getUrl('error')], {
      skipLocationChange: defaultSkipLocationChange,
      state: <IError>{
        title: title,
        message: message
      }
    });
  }

  static forUnidentifiedError(router: Router): void {
    const urlHelper = new UrlHelper();
    router.navigate([urlHelper.getUrl('error')], {
      skipLocationChange: defaultSkipLocationChange,
      state: <IError>{
        title: 'Unidentified error',
        message: 'Problem loading page. Path: ' + router.url
      }
    });
  }

  static forInvalidGuid(router: Router): void {
    const urlHelper = new UrlHelper();
    router.navigate([urlHelper.getUrl('error')], {
      skipLocationChange: defaultSkipLocationChange,
      state: <IError>{
        title: 'Reference error',
        message: 'Invalid reference ID. Path: ' + router.url
      }
    });
  }

  static forEntityLoadError(router: Router): void {
    const urlHelper = new UrlHelper();
    router.navigate([urlHelper.getUrl('error')], {
      skipLocationChange: defaultSkipLocationChange,
      state: <IError>{
        title: 'Entity loading error',
        message: 'Couldn\'t load target entity. Path: ' + router.url
      }
    });
  }

  static forForbiddenError(router: Router): void {
    const urlHelper = new UrlHelper();
    router.navigate([urlHelper.getUrl('error')], {
      skipLocationChange: defaultSkipLocationChange,
      state: <IError>{
        title: 'Forbidden',
        message: 'You don\'t have permissions to access this resource. Path: ' + router.url
      }
    });
  }
}
