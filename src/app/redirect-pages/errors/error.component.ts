import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UrlHelper } from 'core/helpers/url-helper';
import { IError } from 'models/app/redirect-pages/error';

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  public model: IError;

  constructor(
    private router: Router,
    public urlHelper: UrlHelper
  ) {
    const errorParams = <IError>router.getCurrentNavigation().extras.state;
    this.model = <IError>{
      title: errorParams?.title ? errorParams?.title : 'Error',
      message: errorParams?.message ? errorParams?.message : 'An error occurred',
      isSignInError: errorParams?.isSignInError ? errorParams?.isSignInError : false
    };
  }

  goHome(): void {
    this.router.navigate([this.urlHelper.getUrl('home')]);
  }
}
