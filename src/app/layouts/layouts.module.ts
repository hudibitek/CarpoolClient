import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'app/pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { SubcomponentsModule } from '../subcomponents/subcomponents.module';
import { PortalHeaderTitleDirective } from './directives/portal-header-title.directive';
// Directives.
import { PortalScrollTopDirective } from './directives/portal-scroll-top.directive';
import { LayoutBoxedComponent } from './layout-boxed/layout-boxed.component';
// Layouts
import { LayoutClassicComponent } from './layout-classic/layout-classic.component';
import { LayoutCompactComponent } from './layout-compact/layout-compact.component';
import { LayoutFunkyComponent } from './layout-funky/layout-funky.component';
// Funky layout submenus
import { SubmenuAComponent } from './layout-funky/sub-menus/submenu-a/submenu-a.component';
import { SubmenuBComponent } from './layout-funky/sub-menus/submenu-b/submenu-b.component';
import { SubmenuCComponent } from './layout-funky/sub-menus/submenu-c/submenu-c.component';
import { LayoutTabbedComponent } from './layout-tabbed/layout-tabbed.component';
import { LayoutToolbarComponent } from './layout-toolbar/layout-toolbar.component';
import { LayoutService } from './layout.service';
import { FooterComponent } from './subcomponents/footer/footer.component';
import { HorizontalMenuComponent } from './subcomponents/horizontal-menu/horizontal-menu.component';
import { LanguageMenuComponent } from './subcomponents/language-menu/language-menu.component';
import { LayoutLoaderComponent } from './subcomponents/layout-loader/layout-loader.component';
import { LayoutSwitcherMenuComponent } from './subcomponents/layout-switcher-menu/layout-switcher-menu.component';
import { MenuSidenavSectionComponent } from './subcomponents/menu-sidenav-section/menu-sidenav-section.component';
import { MenuSidenavComponent } from './subcomponents/menu-sidenav/menu-sidenav.component';
import { NotificationSidenavComponent } from './subcomponents/notification-sidenav/notification-sidenav.component';
import { ThemeSwitcherMenuComponent } from './subcomponents/theme-switcher-menu/theme-switcher-menu.component';
import { TopHorizontalMenuComponent } from './subcomponents/top-horizontal-menu/top-horizontal-menu.component';
// Subcomponents
import { UserMenuComponent } from './subcomponents/user-menu/user-menu.component';
import { VerticalIconMenuComponent } from './subcomponents/vertical-icon-menu/vertical-icon-menu.component';

@NgModule({
  imports: [
    PipesModule,
    SharedModule,
    SubcomponentsModule,
    RouterModule
  ],
  declarations: [
    LayoutClassicComponent,
    LayoutToolbarComponent,
    LayoutCompactComponent,
    LayoutBoxedComponent,
    LayoutTabbedComponent,
    LayoutFunkyComponent,
    UserMenuComponent,
    MenuSidenavComponent,
    NotificationSidenavComponent,
    LanguageMenuComponent,
    VerticalIconMenuComponent,
    ThemeSwitcherMenuComponent,
    LayoutSwitcherMenuComponent,
    PortalHeaderTitleDirective,
    HorizontalMenuComponent,
    TopHorizontalMenuComponent,
    PortalScrollTopDirective,
    LayoutLoaderComponent,
    FooterComponent,
    SubmenuAComponent,
    SubmenuBComponent,
    SubmenuCComponent,
    MenuSidenavSectionComponent
  ],
  providers: [
    LayoutService
  ]
})
export class LayoutsModule { }
