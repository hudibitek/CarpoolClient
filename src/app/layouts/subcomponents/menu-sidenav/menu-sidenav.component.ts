import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { UrlHelper } from 'core/helpers/url-helper';
import { IMenuSection } from 'models/app/menu/menu-section';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'portal-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss']
})
export class MenuSidenavComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  routerSubscription: Subscription;
  public menuSections: IMenuSection[];

  constructor(
    private router: Router,
    private urlHelper: UrlHelper
  ) {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: RouterEvent) => {
        if (this.sidenav && this.sidenav.mode === 'over' && this.sidenav.opened) {
          this.sidenav.close();
        }
      });
  }

  ngOnInit(): void {
    this.menuSections = [];
    const rootMenuSection = this.getRootMenuSection();
    this.menuSections.push(rootMenuSection);
  }

  private getRootMenuSection(): IMenuSection {
    const menuSection = <IMenuSection>{
      title: 'Carpool',
      items: [
        {
          name: 'Travel plans',
          icon: 'visibility',
          link: this.urlHelper.getUrl('travel-plans-list')
        },
        {
          name: 'Cars',
          icon: 'directions_car',
          link: this.urlHelper.getUrl('cars-list')
        },
        {
          name: 'Employees',
          icon: 'people',
          link: this.urlHelper.getUrl('employees-list')
        },
        {
          name: 'Stats',
          icon: 'stars',
          link: this.urlHelper.getUrl('carpool-stats-list')
        }
      ]
    };

    return menuSection;
  }
}
