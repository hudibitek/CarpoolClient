import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorPageRedirect } from 'core/helpers/error-page-redirect';

@Component({
  selector: 'portal-error-404',
  templateUrl: './error-404.component.html',
  styleUrls: ['./error-404.component.scss']
})
export class Error404Component implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    ErrorPageRedirect.forError(this.router, 'Error 404', 'Page not found.');
  }
}
