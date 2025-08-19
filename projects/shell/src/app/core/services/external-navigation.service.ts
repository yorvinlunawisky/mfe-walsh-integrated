import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

export interface ExternalAppConfig {
  baseUrl: string;
  routes: {
    [key: string]: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ExternalNavigationService {
  
  private readonly legacyApps: { [key: string]: ExternalAppConfig } = {
    'juno-frontend': {
      baseUrl: environment.legacyAppConfig.baseUrl, // Environment-based URL
      routes: {
        'followups': '/followups',
        'reports-performance-inspection': '/reports/performance-inspection', 
        'reports-performance-evaluator': '/reports/performance-evaluator',
        'reports-performance-operator': '/reports/performance-operator',
        'setup-accounts': '/accounts',
        'setup-assignments': '/assignments',
        'setup-departments': '/departments',
        'setup-job-titles': '/job-titles',
        'setup-inspection-templates': '/inspection-templates',
        'setup-location-structure': '/locations/location-structure',
        'setup-location-model': '/location-types',
        'setup-topics': '/topics',
        'setup-predefined-notes': '/predefined-notes',
        'setup-users': '/users',
        'setup-response-options': '/response-options',
        'setup-mmg-settings': '/settings'
      }
    }
  };

  constructor() { }

  /**
   * Navigate to an external legacy application with cross-domain authentication
   * @param appName The name of the legacy app (e.g., 'juno-frontend')
   * @param routeKey The route key in the app's route configuration
   * @param openInNewTab Whether to open in a new tab (default: false)
   */
  navigateToLegacyApp(appName: string, routeKey: string, openInNewTab: boolean = false): void {
    const appConfig = this.legacyApps[appName];
    
    if (!appConfig) {
      console.error(`Legacy app '${appName}' not found in configuration`);
      return;
    }

    const route = appConfig.routes[routeKey];
    if (!route) {
      console.error(`Route '${routeKey}' not found for app '${appName}'`);
      return;
    }

    // Build URL with authentication parameters for cross-domain authentication
    const authParams = this.buildAuthUrlParams();
    const separator = route.includes('?') ? '&' : '?';
    const fullUrl = `${appConfig.baseUrl}${route}${authParams ? separator + authParams : ''}`;
    
    console.log('Navigating to legacy app with auth params:', fullUrl);
    
    if (openInNewTab) {
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
    } else {
      // For same-tab navigation, preserve the current session
      window.location.href = fullUrl;
    }
  }

  /**
   * Build authentication URL parameters for cross-domain authentication
   * @returns URL-encoded authentication parameters
   */
  private buildAuthUrlParams(): string {
    const authData = {
      access_token: localStorage.getItem('access_token'),
      user_id: localStorage.getItem('user_id'),
      user_email: localStorage.getItem('user_email'),
      user_name: localStorage.getItem('user_name'),
      token_expires: localStorage.getItem('token_expires'),
      isLoggedIn: localStorage.getItem('isLoggedIn'),
      selectedAccountID: localStorage.getItem('selectedAccountID'),
      selectedAccountName: localStorage.getItem('selectedAccountName'),
      selectedRolesID: localStorage.getItem('selectedRolesID'),
      selectedRoleName: localStorage.getItem('selectedRoleName'),
      userFirstName: localStorage.getItem('userFirstName'),
      userLastName: localStorage.getItem('userLastName')
    };

    // Only include non-null values
    const params = new URLSearchParams();
    Object.entries(authData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.append(`mfe_${key}`, encodeURIComponent(value));
      }
    });

    return params.toString();
  }

  /**
   * Get the external URL for a specific legacy app route
   * @param appName The name of the legacy app
   * @param routeKey The route key
   * @returns The full external URL or null if not found
   */
  getExternalUrl(appName: string, routeKey: string): string | null {
    const appConfig = this.legacyApps[appName];
    
    if (!appConfig || !appConfig.routes[routeKey]) {
      return null;
    }

    return `${appConfig.baseUrl}${appConfig.routes[routeKey]}`;
  }

  /**
   * Check if a route should be handled externally
   * @param routeKey The route key to check
   * @returns True if the route is configured for external navigation
   */
  isExternalRoute(routeKey: string): boolean {
    return Object.values(this.legacyApps).some(app => 
      Object.keys(app.routes).includes(routeKey)
    );
  }
}