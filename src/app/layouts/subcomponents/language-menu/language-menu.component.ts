import { Component } from '@angular/core';

@Component({
  selector: 'portal-language-menu',
  templateUrl: './language-menu.component.html',
  styleUrls: ['./language-menu.component.scss']
})
export class LanguageMenuComponent {
  public localesList = [
    { code: '/', label: 'English' }
  ];
}
