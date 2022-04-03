import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'portal-notification-sidenav',
  templateUrl: './notification-sidenav.component.html',
  styleUrls: ['./notification-sidenav.component.scss']
})
export class NotificationSidenavComponent {
  @Input() sidenav: MatSidenav;
}
