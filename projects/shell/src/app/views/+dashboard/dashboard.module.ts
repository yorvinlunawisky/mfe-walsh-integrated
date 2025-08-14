import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRouting } from './dashboard.routing';
import { SharedModule } from '../../shared/shared.module';





@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRouting,
    SharedModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }


