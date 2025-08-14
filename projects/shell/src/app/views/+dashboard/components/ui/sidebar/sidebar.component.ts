import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService, Theme } from '../../../../../core/services/theme.service';
import { ModalService, ModalResult } from '../../../../../shared/services/modal.service';
import { ExternalNavigationService } from '../../../../../core/services/external-navigation.service';
import { Observable } from 'rxjs';
import { SIDEBAR_ROUTES, SidebarRoute } from './sidebar-routes.config';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  @Input() isCollapsed: boolean = false;
  @Input() isOpen: boolean = false;
  @Input() currentUser: User | null = null;
  
  @Output() collapseToggle = new EventEmitter<void>();
  @Output() mobileClose = new EventEmitter<void>();
  @Output() userLogout = new EventEmitter<void>();
  
  currentTheme$: Observable<Theme>;
  sidebarRoutes: SidebarRoute[] = SIDEBAR_ROUTES;

  constructor(
    private router: Router, 
    private themeService: ThemeService,
    private modalService: ModalService,
    private externalNavigationService: ExternalNavigationService
  ) {
    this.currentTheme$ = this.themeService.currentTheme$;
  }

  ngOnInit(): void {
    // Component initialization
  }

  /**
   * Toggle sidebar collapse state
   */
  toggleCollapse(): void {
    this.collapseToggle.emit();
  }

  /**
   * Close mobile sidebar
   */
  closeMobileSidebar(): void {
    this.mobileClose.emit();
  }

  /**
   * Handle user logout with confirmation modal
   */
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

  /**
   * Navigate to specific route or external app
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
    // Close mobile sidebar after navigation
    this.closeMobileSidebar();
  }

  /**
   * Handle navigation for sidebar route (internal or external)
   */
  handleRouteNavigation(route: SidebarRoute): void {
    if (route.isExternal && route.externalApp && route.externalRoute) {
      // External navigation to legacy app
      this.externalNavigationService.navigateToLegacyApp(
        route.externalApp, 
        route.externalRoute
      );
    } else if (route.routerLink) {
      // Internal navigation
      this.navigateTo(route.routerLink);
    }
    
    // Close mobile sidebar after navigation
    this.closeMobileSidebar();
  }

  /**
   * Toggle collapsible menu section
   */
  toggleSection(route: SidebarRoute): void {
    if (route.isCollapsible) {
      route.isExpanded = !route.isExpanded;
    }
  }
}