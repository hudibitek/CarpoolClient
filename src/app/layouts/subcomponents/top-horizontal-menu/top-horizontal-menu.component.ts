import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { environment } from 'environments/environment';
@Component({
  selector: 'portal-top-horizontal-menu',
  templateUrl: './top-horizontal-menu.component.html',
  styleUrls: ['./top-horizontal-menu.component.scss']
})
export class TopHorizontalMenuComponent {
  @Input() leftSidenav: MatSidenav;
  @Input() rightSidenav: MatSidenav;
  @Input() transparent: Boolean = false;

  public notificationsCount: number = 0;

  public get environmentName(): string {
    return environment.name;
  }

  openRightSidenav(): void {
    this.rightSidenav.open();
  }

  showMenuIcon(): boolean {
    return this.leftSidenav && !this.leftSidenav.opened;
  }
}
