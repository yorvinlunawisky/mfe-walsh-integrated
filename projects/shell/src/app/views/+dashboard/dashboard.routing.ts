import { Routes, RouterModule} from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { loadRemoteModule } from '@angular-architects/module-federation';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'inspections',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: './InspectionsModule'
    }).then(m => m.InspectionsModule),
    data: {
      title: 'Inspections',
    }
  },
  {
    path: 'reports',
    loadChildren: () => import('../../shared/placeholder/placeholder.module').then(m => m.PlaceholderModule),
    data: {
      title: 'Reports',
    }
  },
  {
    path: 'settings',
    loadChildren: () => import('../../shared/placeholder/placeholder.module').then(m => m.PlaceholderModule),
    data: {
      title: 'Settings',
    }
  },
  {
    path: 'activities',
    loadChildren: () => import('../../shared/placeholder/placeholder.module').then(m => m.PlaceholderModule),
    data: {
      title: 'Activities',
    }
  }
];

export const DashboardRouting = RouterModule.forChild(routes);
