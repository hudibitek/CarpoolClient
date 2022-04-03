import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'funky-submenu-a',
  templateUrl: './submenu-a.component.html',
  styleUrls: ['./submenu-a.component.scss']
})
export class SubmenuAComponent {
  @Input() menuDrawer: MatSidenav;
}
