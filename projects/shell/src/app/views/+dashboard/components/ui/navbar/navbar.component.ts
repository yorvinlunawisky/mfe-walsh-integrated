import { Component, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ThemeService, Theme } from '../../../../../core/services/theme.service';
import { ModalService, ModalResult } from '../../../../../shared/services/modal.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  @Input() sidebarCollapsed = false;
  @Input() sidebarOpen = false;
  @Input() isMobile = false;
  @Input() isEvaluator = false;
  @Input() currentUser: { name: string; email: string; avatar?: string } | null = null;
  @Input() profileMenuOpen = false;
  
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() mobileSidebarToggle = new EventEmitter<void>();
  @Output() userLogout = new EventEmitter<void>();
  @Output() profileMenuToggle = new EventEmitter<void>();
  

  currentTheme$: Observable<Theme>;
  selectedAccountName: string = '';
  selectedRoleName: string = '';
  currentSection: string = 'Overview';
  currentRoute: string = '';
  
  constructor(
    private router: Router,
    private themeService: ThemeService,
    private modalService: ModalService
  ) {
    this.currentTheme$ = this.themeService.currentTheme$;
  }

  ngOnInit(): void {
    this.loadUserSelections();
    this.updateBreadcrumb();
    
    // Listen to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumb();
      });
  }

  private loadUserSelections(): void {
    this.selectedAccountName = localStorage.getItem('selectedAccountName') || '';
    this.selectedRoleName = localStorage.getItem('selectedRoleName') || '';
  }

  private updateBreadcrumb(): void {
    this.currentRoute = this.router.url;
    
    if (this.currentRoute.includes('/dashboard/inspections')) {
      this.currentSection = 'Inspections';
    } else if (this.currentRoute.includes('/dashboard/reports')) {
      this.currentSection = 'Reports';
    } else if (this.currentRoute.includes('/dashboard/settings')) {
      this.currentSection = 'Settings';
    } else if (this.currentRoute.includes('/dashboard/activities')) {
      this.currentSection = 'Activities';
    } else if (this.currentRoute === '/dashboard') {
      this.currentSection = 'Overview';
    } else {
      this.currentSection = 'Dashboard';
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

  closeSidebar(): void {
    // This will be handled by the parent component
  }

  toggleProfileMenu(): void {
    this.profileMenuToggle.emit();
  }

  toggleMobileSidebar(): void {
    this.mobileSidebarToggle.emit();
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  logout(): void {
    this.modalService.showConfirmation(
      'Confirm Logout',
      'Are you sure you want to sign out? You will need to log in again to access your account.',
      'Sign Out',
      'Stay Logged In'
    ).then((result: ModalResult) => {
      if (result.action === 'confirm') {
        this.userLogout.emit();
      }
      // If cancelled, do nothing - user stays logged in
    });
  }


}
