import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../views/+auth/auth.service';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  
  // Component state
  sidebarCollapsed = false;
  sidebarOpen = false;
  profileMenuOpen = false;
  isMobile = false;
  isEvaluator = false;
  
  // User data
  currentUser: User = {
    name: '',
    email: ''
  };

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.loadUserData();
    this.setupEventListeners();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScreenSize();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-dropdown-trigger') && !target.closest('.profile-dropdown')) {
      this.profileMenuOpen = false;
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeSidebar();
      this.profileMenuOpen = false;
    }

    if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
      event.preventDefault();
      this.toggleSidebar();
    }
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
    
    if (this.isMobile && !this.sidebarCollapsed) {
      this.sidebarCollapsed = true;
      this.sidebarOpen = false;
    }
    
    if (!this.isMobile && this.sidebarCollapsed && window.innerWidth > 1024) {
      this.sidebarCollapsed = false;
    }
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    localStorage.setItem('sidebarCollapsed', JSON.stringify(this.sidebarCollapsed));
  }

  toggleMobileSidebar(): void {
    if (this.isMobile) {
      this.sidebarOpen = !this.sidebarOpen;
    }
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  logout(): void {
    this.profileMenuOpen = false;
    this.authService.logout();
    console.log('User logged out successfully');
  }

  private loadUserData(): void {
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    if (savedSidebarState) {
      this.sidebarCollapsed = JSON.parse(savedSidebarState);
    }
    
    // Load current user data from AuthService
    const firstName = this.authService.getUserFirstName();
    const lastName = this.authService.getUserLastName();
    const userEmail = this.authService.getUserEmail();
    
    // Create full name from first and last name
    let fullName = 'User';
    if (firstName && lastName) {
      fullName = `${firstName} ${lastName}`;
    } else if (firstName) {
      fullName = firstName;
    } else if (lastName) {
      fullName = lastName;
    }
    
    this.currentUser = {
      name: fullName,
      email: userEmail || 'user@walsh.com'
    };
    
    // Check if user has Evaluator role
    const selectedRoleName = localStorage.getItem('selectedRoleName');
    this.isEvaluator = selectedRoleName === 'Evaluator';
  }

  private setupEventListeners(): void {
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.isMobile) {
          this.closeSidebar();
        }
        this.profileMenuOpen = false;
      });
  }


}