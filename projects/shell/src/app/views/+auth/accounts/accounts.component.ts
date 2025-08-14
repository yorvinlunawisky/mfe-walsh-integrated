import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Account } from 'projects/shared/models/accounts/accounts.model';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
  @ViewChild('accountDropdown') accountDropdown!: Dropdown;
  
  currentYear = new Date().getFullYear();
  selectedAccount: Account | null = null;
  accounts: Account[] = [];
  loading = false;
  error: string | null = null;
  
  private initialViewportHeight: number = 0;
  private isDropdownOpen = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
    this.initialViewportHeight = window.innerHeight;
  }
  
  ngOnDestroy(): void {
    // Cleanup if needed
  }

  loadAccounts(): void {
    const userId = this.authService.getUserId();
    const token = this.authService.getToken();
    
    if (!userId || !token) {
      this.error = 'User not authenticated';
      this.router.navigate(['/auth/login']);
      return;
    }

    this.loading = true;
    this.error = null;
    
    this.authService.getAccounts(userId, token).subscribe({
      next: (response) => {
          this.accounts = response || [];
          this.loading = false;
        },
      error: (error) => {
        console.error('Error loading accounts:', error);
        this.error = 'Failed to load accounts. Please try again.';
        this.loading = false;
      }
    });
  }

  onAccountSelect(): void {
    if (this.selectedAccount) {
      // Store the account ID in localStorage as requested
      localStorage.setItem('accountId', this.selectedAccount.Id.toString());
      // Store the account name for navbar display
      localStorage.setItem('selectedAccountName', this.selectedAccount.Name);
      // Also store the full account object for reference
      localStorage.setItem('selectedAccount', JSON.stringify(this.selectedAccount));
      this.router.navigate(['/auth/roles']);
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
  
  onDropdownShow(): void {
    this.isDropdownOpen = true;
    // Prevent body scroll on mobile when dropdown is open
    if (this.isMobileDevice()) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    }
  }
  
  onDropdownHide(): void {
    this.isDropdownOpen = false;
    // Restore body scroll
    if (this.isMobileDevice()) {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  }
  
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any): void {
    // Handle viewport changes (like keyboard appearance) on mobile
    if (this.isMobileDevice() && this.isDropdownOpen) {
      const currentHeight = window.innerHeight;
      const heightDifference = this.initialViewportHeight - currentHeight;
      
      // If viewport height decreased significantly (keyboard appeared)
      if (heightDifference > 150) {
        // Keep dropdown open and adjust its position
        setTimeout(() => {
          if (this.accountDropdown && this.accountDropdown.overlayVisible) {
            // Force dropdown to stay open
            this.accountDropdown.overlayVisible = true;
          }
        }, 100);
      }
    }
  }
  
  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (window.innerWidth <= 768);
  }
}