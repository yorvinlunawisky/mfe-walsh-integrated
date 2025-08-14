import { Injectable } from '@angular/core';

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
      baseUrl: 'https://junoqa.azurewebsites.net',
      routes: {
        'followups': '/followups',
        'reports-performance-inspection': '/reports/performance-inspection', 
        'reports-performance-evaluator': '/reports/performance-evaluator',
        'reports-performance-operator': '/reports/performance-operator',
        'setup-accounts': '/accounts',
        'setup-assignments': '/assignments',
        'setup-departments': '/departments',
        'setup-job-titles': '/jobtitles',
        'setup-inspection-templates': '/evaluationtypes',
        'setup-location-structure': '/locations',
        'setup-location-model': '/locationtypes',
        'setup-topics': '/topics',
        'setup-predefined-notes': '/notes',
        'setup-users': '/users',
        'setup-response-options': '/responsesets',
        'setup-mmg-settings': '/settings'
      }
    }
  };

  constructor() { }

  /**
   * Navigate to an external legacy application
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

    const fullUrl = `${appConfig.baseUrl}${route}`;
    
    if (openInNewTab) {
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
    } else {
      // For same-tab navigation, preserve the current session
      window.location.href = fullUrl;
    }
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