import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RolesByUser } from 'projects/shared/models/roles/roles.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  currentYear = new Date().getFullYear();
  selectedRole: RolesByUser | null = null;
  roles: RolesByUser[] = [];
  loading = false;
  error = '';
  debugInfo = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {    
    // Check if user has selected an account
    const selectedAccount = localStorage.getItem('selectedAccount');
    
    if (!selectedAccount) {
      this.router.navigate(['/auth/accounts']);
      return;
    }
    
    this.loadRoles();
  }

  loadRoles(): void {
    const selectedAccount = localStorage.getItem('selectedAccount');
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('access_token');
    
    this.debugInfo = `Debug Info:\n` +
      `selectedAccount: ${selectedAccount ? 'Present' : 'Missing'}\n` +
      `userId: ${userId ? 'Present' : 'Missing'}\n` +
      `token: ${token ? 'Present' : 'Missing'}`;
    
    if (!selectedAccount || !userId || !token) {
      this.error = 'Missing required authentication data';
      this.debugInfo += '\nError: Missing required data';
      return;
    }
    
    try {
      const account = JSON.parse(selectedAccount);
      const accountId = account.Id || account.accountId;
      
      this.debugInfo += `\nParsed account: ${JSON.stringify(account)}\naccountId: ${accountId}`;
      
      if (!accountId) {
        this.error = 'Invalid account data';
        this.debugInfo += '\nError: No accountId found';
        return;
      }
      
      this.debugInfo += `\nMaking API call with userId: ${userId}, accountId: ${accountId}`;
      
      this.loading = true;
      this.error = '';
      
      this.authService.getRolesByUser(userId, accountId.toString(), token).subscribe({
        next: (roles) => {
          this.roles = roles;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading roles:', error);
          this.error = 'Failed to load roles. Please try again.';
          this.loading = false;
        }
      });
    } catch (error) {
      console.error('Error parsing account data:', error);
      this.error = 'Invalid account data format';
    }
  }

  getIconForRole(roleName: string): string {
    const roleIcons: { [key: string]: string } = {
      'Account Administrator': 'pi pi-shield',
      'Evaluator': 'pi pi-search',
      'Manager': 'pi pi-users',
      'Operator': 'pi pi-cog',
      'Administrator': 'pi pi-shield',
      'Inspector': 'pi pi-search'
    };
    
    return roleIcons[roleName] || 'pi pi-user';
  }

  onRoleSelect(role: RolesByUser): void {
    this.selectedRole = role;
    localStorage.setItem('selectedRole', JSON.stringify(role));
    localStorage.setItem('roleId', role.Id.toString());
    localStorage.setItem('selectedRoleName', role.Name);
    
    // Redirect Evaluators to the inspections-mfe app with dashboard as default
    if (role.Name === 'Evaluator') {
      this.router.navigate(['/dashboard/inspections']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  onBackToAccounts(): void {
    this.router.navigate(['/auth/accounts']);
  }

  onLogout(): void {
    this.authService.logout();
    localStorage.removeItem('selectedAccount');
    localStorage.removeItem('selectedRole');
    this.router.navigate(['/auth/login']);
  }
}