
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from '../views/+dashboard/components/ui/navbar/navbar.component';
import { SidebarComponent } from '../views/+dashboard/components/ui/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    DashboardLayoutComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterModule,
    SharedModule
  ],
  exports: [
    AuthLayoutComponent,
    DashboardLayoutComponent
  ]
})
export class LayoutsModule { }
