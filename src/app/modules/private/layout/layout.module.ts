import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarMenuComponent } from './components/sidebar/sidebar-menu/sidebar-menu.component';
import { SidebarSubmenuComponent } from './components/sidebar/sidebar-submenu/sidebar-submenu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ProfileMenuComponent } from './components/navbar/profile-menu/profile-menu.component';
import { NavbarMenuComponent } from './components/navbar/navbar-menu/navbar-menu.component';
import { NavbarMobileComponent } from './components/navbar/navbar-mobile/navbar-mobilecomponent';
import { NavbarSubmenuComponent } from './components/navbar/navbar-submenu/navbar-submenu.component';
import { NavbarMobileSubmenuComponent } from './components/navbar/navbar-mobile/navbar-mobile-submenu/navbar-mobile-submenu.component';
import { NavbarMobileMenuComponent } from './components/navbar/navbar-mobile/navbar-mobile-menu/navbar-mobile-menu.component';
@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    RouterModule,
    AngularSvgIconModule.forRoot(),
  ],
  declarations: [
    SidebarComponent,
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    SidebarMenuComponent,
    SidebarSubmenuComponent,
    ProfileMenuComponent,
    NavbarMenuComponent,
    NavbarMobileComponent,
    NavbarSubmenuComponent,
    NavbarMobileSubmenuComponent,
    NavbarMobileMenuComponent,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class LayoutModule {}
