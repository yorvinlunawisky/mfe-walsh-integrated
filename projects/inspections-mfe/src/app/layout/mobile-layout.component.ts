import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-layout',
  template: `
    <div class="mobile-layout h-screen flex flex-col bg-gray-50">
      <!-- Main Content Area -->
      <div class="flex-1 overflow-y-auto pb-20">
        <router-outlet></router-outlet>
      </div>
      
      <!-- Bottom Navigation -->
      <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div class="flex justify-around items-center py-1">
          <!-- Dashboard -->
          <button 
            (click)="navigateTo('/dashboard')"
            [class]="getNavItemClass('/dashboard')"
            class="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-0 flex-1">
            <i class="pi pi-home text-base mb-0.5"></i>
            <span class="text-xs font-medium">Dashboard</span>
          </button>
          
          <!-- Inspect Now -->
          <button 
            (click)="navigateTo('/inspect')"
            [class]="getNavItemClass('/inspect')"
            class="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-0 flex-1">
            <i class="pi pi-search text-base mb-0.5"></i>
            <span class="text-xs font-medium">Inspect Now</span>
          </button>
          
          <!-- Follow-Up -->
          <button 
            (click)="navigateTo('/follow-up')"
            [class]="getNavItemClass('/follow-up')"
            class="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-0 flex-1">
            <i class="pi pi-clock text-base mb-0.5"></i>
            <span class="text-xs font-medium">Follow-Up</span>
          </button>
          
          <!-- Support -->
          <button 
            (click)="navigateTo('/support')"
            [class]="getNavItemClass('/support')"
            class="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-0 flex-1">
            <i class="pi pi-question-circle text-base mb-0.5"></i>
            <span class="text-xs font-medium">Support</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mobile-layout {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .nav-item-active {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
    
    .nav-item-inactive {
      color: #6b7280;
    }
    
    .nav-item-inactive:hover {
      background: #f3f4f6;
      color: #374151;
    }
  `]
})
export class MobileLayoutComponent {
  
  constructor(private router: Router) {}
  
  navigateTo(route: string): void {
    // Check if we're running as a micro frontend
    const currentUrl = window.location.href;
    const isMicroFrontend = currentUrl.includes('/dashboard/inspections');
    
    if (isMicroFrontend) {
      // When running as MFE, navigate relative to the current MFE context
      const routePath = route.startsWith('/') ? route.substring(1) : route;
      this.router.navigate([routePath]);
    } else {
      // When running standalone, navigate normally
      const routePath = route.startsWith('/') ? route.substring(1) : route;
      this.router.navigate([routePath]);
    }
  }
  
  getNavItemClass(route: string): string {
    const currentRoute = this.router.url;
    const routePath = route.startsWith('/') ? route.substring(1) : route;
    
    // Handle micro frontend URL structure
    // When running as MFE, URLs will be like /dashboard/inspections/dashboard
    // When running standalone, URLs will be like /dashboard
    let isActive = false;
    
    if (routePath === 'dashboard') {
      // Dashboard is active if URL ends with /dashboard or is root
      isActive = currentRoute === '/' || 
                 currentRoute.endsWith('/dashboard') || 
                 currentRoute === '/dashboard';
    } else {
      // For other routes, check if URL ends with the specific route
      isActive = currentRoute.endsWith(`/${routePath}`) || 
                 currentRoute === `/${routePath}`;
    }
    
    return isActive ? 'nav-item-active' : 'nav-item-inactive';
  }
}