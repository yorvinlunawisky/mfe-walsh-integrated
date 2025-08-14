import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG imports
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { InspectionsRoutingModule } from './inspections-routing.module';
import { InspectComponent } from './inspect.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FollowUpComponent } from '../follow-up/follow-up.component';
import { SupportComponent } from '../support/support.component';
import { MobileLayoutComponent } from '../layout/mobile-layout.component';

@NgModule({
  declarations: [
    InspectComponent,
    DashboardComponent,
    FollowUpComponent,
    SupportComponent,
    MobileLayoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DropdownModule,
    ButtonModule,
    InspectionsRoutingModule
  ]
})
export class InspectionsModule { }