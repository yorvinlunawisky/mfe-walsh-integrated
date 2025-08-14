import { Component } from '@angular/core';
import { AppSwDataService } from '../../../../../shared/service-worker/app.sw-data.service';
import { AppSwStateService } from '../../../../../shared/service-worker/app-sw-state.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {
  constructor(public appSwDataService: AppSwDataService, public appSwStateService: AppSwStateService) {
  }
}
