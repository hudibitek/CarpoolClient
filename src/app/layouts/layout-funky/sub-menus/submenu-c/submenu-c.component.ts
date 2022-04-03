import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'funky-submenu-c',
  templateUrl: './submenu-c.component.html',
  styleUrls: ['./submenu-c.component.scss']
})
export class SubmenuCComponent {
  @Input() menuDrawer: MatSidenav;
}
