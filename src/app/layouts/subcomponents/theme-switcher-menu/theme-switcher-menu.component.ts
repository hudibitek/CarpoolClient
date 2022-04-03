import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { LayoutService } from './../../layout.service';

@Component({
  selector: 'portal-theme-switcher-menu',
  templateUrl: './theme-switcher-menu.component.html',
  styleUrls: ['./theme-switcher-menu.component.scss']
})
export class ThemeSwitcherMenuComponent {
  themes: Theme[] = [
    {
      id: 'classic-light_blue-cyan',
      name: 'Classic - Light Blue / Cyan',
      url: 'styles.css',
      sidebar: 'white',
      toolbar: '#FFF',
      content: '#FFF',
      primary: '#03A9F4',
      accent: '#80DEEA'
    },
    {
      id: 'classic-light_blue-pink',
      name: 'Classic - Light Blue / Pink',
      url: 'theme-classic-light_blue-pink.css',
      sidebar: '#424242',
      toolbar: '#FFF',
      content: '#FFF',
      primary: '#03A9F4',
      accent: '#FF4081'
    },
    {
      id: 'classic-green-deep_orange',
      name: 'Classic - Green / Deep Orange',
      url: 'theme-classic-green-deep_orange.css',
      sidebar: '#424242',
      toolbar: '#FFF',
      content: '#FFF',
      primary: '#4CAF50',
      accent: '#FF5722'
    },
    {
      id: 'classic-indigo-orange',
      name: 'Classic - Indigo / Orange',
      url: 'theme-classic-indigo-orange.css',
      sidebar: '#424242',
      toolbar: '#FFF',
      content: '#FFF',
      primary: '#3F51B5',
      accent: '#FF9800'
    },
    {
      id: 'dark-light_blue-pink',
      name: 'Dark - Light Blue / Pink',
      url: 'theme-dark-light_blue-pink.css',
      sidebar: '#424242',
      toolbar: '#424242',
      content: '#FFF',
      primary: '#03A9F4',
      accent: '#FF4081'
    },
    {
      id: 'dark-green-deep_orange',
      name: 'Dark - Green / Deep Orange',
      url: 'theme-dark-green-deep_orange.css',
      sidebar: '#424242',
      toolbar: '#424242',
      content: '#FFF',
      primary: '#4CAF50',
      accent: '#FF5722'
    },
    {
      id: 'dark-indigo-orange',
      name: 'Dark - Indigo / Orange',
      url: 'theme-dark-indigo-orange.css',
      sidebar: '#424242',
      toolbar: '#424242',
      content: '#FFF',
      primary: '#3F51B5',
      accent: '#FF9800'
    },
    {
      id: 'night-light_blue-pink',
      name: 'Night - Light Blue / Pink',
      url: 'theme-night-light_blue-pink.css',
      sidebar: '#424242',
      toolbar: '#424242',
      content: '#424242',
      primary: '#03A9F4',
      accent: '#FF4081'
    },
    {
      id: 'night-green-deep_orange',
      name: 'Night - Green / Deep Orange',
      url: 'theme-night-green-deep_orange.css',
      sidebar: '#424242',
      toolbar: '#424242',
      content: '#424242',
      primary: '#4CAF50',
      accent: '#FF5722'
    },
    {
      id: 'night-indigo-orange',
      name: 'Night - Indigo / Orange',
      url: 'theme-night-indigo-orange.css',
      sidebar: '#424242',
      toolbar: '#424242',
      content: '#424242',
      primary: '#3F51B5',
      accent: '#FF9800'
    }
  ];

  currentTheme: Theme = this.themes[0];
  isThemeSet: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private layoutService: LayoutService
  ) {
    const themeID = sessionStorage.getItem('portal-theme');
    if (themeID !== null) {
      const theme = this.themes.find(findTheme => findTheme.id === themeID);
      if (undefined !== theme) {
        this.switch(theme);
      }
    } else {
      this.switch(this.currentTheme);
    }
  }

  switch(theme: Theme): void {
    if (theme !== this.currentTheme || !this.isThemeSet) {
      const linkId = 'current-theme-link';
      let link: any = this.document.querySelector('link[id="' + linkId + '"]');
      if (link) {
        link.href = theme.url;
      } else {
        link = this.document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = theme.url;
        const head = this.document.querySelector('head');
        head.appendChild(link);
      }

      this.currentTheme = theme;
      this.layoutService.setCurrentTheme(theme);
      sessionStorage.setItem('portal-theme', theme.id);
      this.isThemeSet = true;
    }
  }
}

interface Theme {
  id: string;
  name: string;
  url: string;
  sidebar: string;
  toolbar: string;
  content: string;
  primary: string;
  accent: string;
}
