import { Component, Input } from '@angular/core';
import { IMenuSection } from 'models/app/menu/menu-section';
import { IMenuSectionItem } from 'models/app/menu/menu-section-item';
@Component({
  selector: 'app-menu-sidenav-section',
  templateUrl: './menu-sidenav-section.component.html',
  styleUrls: ['./menu-sidenav-section.component.scss']
})
export class MenuSidenavSectionComponent {
  @Input() menuSection: IMenuSection;

  public onItemClicked(item: IMenuSectionItem): void {
    if (item?.onClickFunc) {
      item.onClickFunc();
    }
  }
}
