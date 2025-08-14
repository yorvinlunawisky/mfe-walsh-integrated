import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InspectorGuard {
  private readonly OPERATOR_ROLE_ID = 6;
  private readonly RESTRICTED_ACCOUNT_ID = 1063;
  private readonly UNAUTHORIZED_MESSAGE = 'You are currently logged in as an "Operator"; you do not have permissions to view this page.';

  constructor(private readonly router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const selectedAccountID = localStorage.getItem('selectedAccountID');
    const selectedRolesID = localStorage.getItem('selectedRolesID');

    // Check if user has required data
    if (!selectedAccountID || !selectedRolesID) {
      this.redirectToLogin();
      return false;
    }

    const roleId = parseInt(selectedRolesID, 10);
    const accountId = parseInt(selectedAccountID, 10);

    // Check if user is an operator without access to restricted account
    if (roleId === this.OPERATOR_ROLE_ID && accountId !== this.RESTRICTED_ACCOUNT_ID) {
      this.showUnauthorizedMessage();
      this.redirectToLogin();
      return false;
    }

    return true;
  }

  private showUnauthorizedMessage(): void {
    window.alert(this.UNAUTHORIZED_MESSAGE);
  }

  private redirectToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
