import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { delay, filter } from 'rxjs/operators';

@Directive({
  selector: '[portalScrollTop]'
})
export class PortalScrollTopDirective implements OnDestroy {
  private routerSubscription: Subscription;
  // check again once this is merged: https://github.com/angular/angular/pull/20030
  constructor(private router: Router, private el: ElementRef) {
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart),
        delay(0)
      )
      .subscribe(route => {
        this.el.nativeElement.scrollTop = 0;
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
