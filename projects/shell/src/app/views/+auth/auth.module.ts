import { LoginComponent } from './login/login.component';
import { RolesComponent } from './roles/roles.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'; 
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';   
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { AuthService } from './auth.service';
import { AuthRouting } from './auth.routing';

@NgModule({
  declarations: [
    LoginComponent,
    RolesComponent,
    AccountsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    AuthRouting,
    NgOptimizedImage
    ],
  exports: [
    LoginComponent,
    RolesComponent,
    AccountsComponent
  ],
  providers: [AuthService]
})
export class AuthModule { }

