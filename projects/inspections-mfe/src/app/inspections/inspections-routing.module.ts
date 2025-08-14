import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectComponent } from './inspect.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FollowUpComponent } from '../follow-up/follow-up.component';
import { SupportComponent } from '../support/support.component';
import { MobileLayoutComponent } from '../layout/mobile-layout.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MobileLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'inspect',
        component: InspectComponent
      },
      {
        path: 'follow-up',
        component: FollowUpComponent
      },
      {
        path: 'support',
        component: SupportComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionsRoutingModule { }