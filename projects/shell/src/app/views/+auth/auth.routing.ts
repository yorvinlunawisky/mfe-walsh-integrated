import { Routes, RouterModule} from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AccountsComponent } from "./accounts/accounts.component";
import { RolesComponent } from "./roles/roles.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,  
    data: {
      title: 'Login',
    },
  },
   {
    path: 'accounts',
    component: AccountsComponent,
    data: {title: 'Select Account'}
  },
  {
    path: 'roles',
    component: RolesComponent,
    data: {title: 'Select Role'}
  },
];

export const AuthRouting = RouterModule.forChild(routes);
