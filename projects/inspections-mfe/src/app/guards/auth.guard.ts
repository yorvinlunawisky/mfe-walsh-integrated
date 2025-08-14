import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * Authentication service interface to ensure compatibility with shell's AuthService
 */
interface AuthService {
  isUserAuthenticated(): boolean;
  getToken(): string | null;
  getUserId(): string | null;
}

/**
 * Simple authentication service for inspections-mfe
 * This mimics the shell's AuthService functionality for standalone operation
 */
class InspectionAuthService implements AuthService {
  isUserAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    const expires = localStorage.getItem('token_expires');
    
    if (!token || !expires) {
      return false;
    }
    
    // Check if token is expired
    const expirationDate = new Date(expires);
    const currentDate = new Date();
    
    if (currentDate >= expirationDate) {
      // Token is expired, clear localStorage
      this.logout();
      return false;
    }
    
    return true;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }

  private logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('token_expires');
  }
}

/**
 * Functional guard that determines if a user can access a specific route.
 * This guard works both when the MFE is loaded standalone and when loaded through the shell.
 */
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean => {
  const router = inject(Router);
  
  // Check if we're running as a micro frontend (loaded through shell)
  const currentUrl = window.location.href;
  const isMicroFrontend = currentUrl.includes('/dashboard/inspections');
  
  if (isMicroFrontend) {
    // When loaded as MFE through shell, check if user is authenticated through shell
    const token = localStorage.getItem('access_token');
    const expires = localStorage.getItem('token_expires');
    const userId = localStorage.getItem('user_id');
    const selectedRole = localStorage.getItem('selectedRoleName');
    
    // Check if all required shell authentication data is present
    if (!token || !expires || !userId) {
      // Missing authentication data, let shell handle the redirect
      console.warn('Missing authentication data in inspections-mfe');
      return false;
    }
    
    // Check if token is expired
    const expirationDate = new Date(expires);
    const currentDate = new Date();
    
    if (currentDate >= expirationDate) {
      // Token is expired, let shell handle the redirect
      console.warn('Token expired in inspections-mfe');
      return false;
    }
    
    // Check if user has Evaluator role (required for inspections-mfe)
    if (selectedRole !== 'Evaluator') {
      // User doesn't have the required role, let shell handle the redirect
      console.warn('User does not have Evaluator role for inspections-mfe');
      return false;
    }
    
    // User is authenticated through shell with proper role
    return true;
  } else {
    // When running standalone, use the local auth service
    const authService = new InspectionAuthService();
    
    if (!authService.isUserAuthenticated()) {
      // Redirect to shell's login as fallback
      window.location.href = '/auth/login';
      return false;
    }
    
    return true;
  }
};