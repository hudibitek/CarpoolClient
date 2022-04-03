import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'funky-submenu-b',
  templateUrl: './submenu-b.component.html',
  styleUrls: ['./submenu-b.component.scss']
})
export class SubmenuBComponent {
  @Input() menuDrawer: MatSidenav;
}
