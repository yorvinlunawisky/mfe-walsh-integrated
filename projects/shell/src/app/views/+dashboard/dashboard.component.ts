import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import  { NgOptimizedImage } from '@angular/common';
import { ModalService, ModalResult } from '../../shared/services/modal.service';
import { AuthService } from '../+auth/auth.service';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface DashboardStats {
  totalInspections: number;
  pendingReviews: number;
  completedToday: number;
  issuesFound: number;
}

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'completed' | 'scheduled' | 'generated' | 'issue';
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [NgOptimizedImage]
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  // Current user data
  currentUser: User = {
    name: '',
    email: ''
  };

  // Dashboard statistics
  stats: DashboardStats = {
    totalInspections: 247,
    pendingReviews: 18,
    completedToday: 8,
    issuesFound: 3
  };

  // Modal testing
  lastModalResult: ModalResult | null = null;

  // Recent activities
  recentActivities: ActivityItem[] = [
    {
      id: '1',
      title: 'Inspection #1247 completed',
      description: 'Building A - Fire Safety Check',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      type: 'completed',
      icon: 'pi-check'
    },
    {
      id: '2',
      title: 'New inspection scheduled',
      description: 'Building C - Electrical Systems',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      type: 'scheduled',
      icon: 'pi-clock'
    },
    {
      id: '3',
      title: 'Report generated',
      description: 'Monthly Compliance Summary',
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      type: 'generated',
      icon: 'pi-file'
    }
  ];

  // Current date and time
  currentDate = new Date();
  currentTime = new Date();
  
  private destroy$ = new Subject<void>();
  private timeInterval?: any;

  constructor(private router: Router, private modalService: ModalService, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeComponent();
    this.startTimeUpdate();
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  /**
   * Initialize component with necessary data
   */
  private initializeComponent(): void {
    // Load user data from service or storage
    this.loadUserData();
    
    // Set up any required subscriptions
    this.setupSubscriptions();
  }

  /**
   * Start updating current time every minute
   */
  private startTimeUpdate(): void {
    this.timeInterval = setInterval(() => {
      this.currentTime = new Date();
    }, 60000); // Update every minute
  }

  /**
   * Load user data
   */
  private loadUserData() {
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
  }

  /**
   * Load dashboard data
   */
  private loadDashboardData(): void {
    // In a real app, you would load this from services
    // this.dashboardService.getStats()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(stats => {
    //     this.stats = stats;
    //   });

    // this.activityService.getRecentActivities()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(activities => {
    //     this.recentActivities = activities;
    //   });
  }

  /**
   * Set up component subscriptions
   */
  private setupSubscriptions(): void {
    // Listen for real-time updates, notifications, etc.
    // this.websocketService.connect()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(update => {
    //     this.handleRealTimeUpdate(update);
    //   });
  }

  /**
   * Start new inspection
   */
  startNewInspection(): void {
    this.router.navigate(['/dashboard/inspections/new']);
  }

  /**
   * Schedule new inspection
   */
  scheduleInspection(): void {
    console.log('Scheduling inspection...');
    this.router.navigate(['/dashboard/inspections/schedule']);
  }

  /**
   * View reports
   */
  viewReports(): void {
    console.log('Viewing reports...');
    this.router.navigate(['/dashboard/reports']);
  }

  /**
   * Open settings
   */
  openSettings(): void {
    console.log('Opening settings...');
    this.router.navigate(['/dashboard/settings']);
  }

  /**
   * View all recent activities
   */
  viewAllActivities(): void {
    console.log('Viewing all activities...');
    this.router.navigate(['/dashboard/activities']);
  }

  /**
   * Get icon class for activity type
   */
  getActivityIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'completed': 'pi-check',
      'scheduled': 'pi-clock',
      'generated': 'pi-file',
      'issue': 'pi-exclamation-triangle'
    };
    return iconMap[type] || 'pi-info-circle';
  }

  /**
   * Get background gradient for activity type
   */
  getActivityBackground(type: string): string {
    const backgroundMap: { [key: string]: string } = {
      'completed': 'from-emerald-500 to-teal-500',
      'scheduled': 'from-amber-500 to-orange-500',
      'generated': 'from-blue-500 to-indigo-500',
      'issue': 'from-red-500 to-pink-500'
    };
    return backgroundMap[type] || 'from-slate-500 to-gray-500';
  }

  /**
   * Format time ago
   */
  getTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - timestamp.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    } else {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    }
  }

  /**
   * Handle real-time updates (if using WebSocket)
   */
  private handleRealTimeUpdate(update: any): void {
    switch (update.type) {
      case 'stats_update':
        this.stats = { ...this.stats, ...update.data };
        break;
      case 'new_activity':
        this.recentActivities.unshift(update.data);
        // Keep only the latest 10 activities
        this.recentActivities = this.recentActivities.slice(0, 10);
        break;
      default:
        console.log('Unknown update type:', update.type);
    }
  }

  /**
   * Refresh dashboard data
   */
  refreshDashboard(): void {
    console.log('Refreshing dashboard...');
    this.loadDashboardData();
  }

  /**
   * Get greeting based on time of day
   */
  get greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good morning';
    } else if (hour < 17) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  }

  /**
   * Check if it's a weekend
   */
  get isWeekend(): boolean {
    const day = new Date().getDay();
    return day === 0 || day === 6; // Sunday is 0, Saturday is 6
  }

  // Modal demo methods
  async showInfoModal() {
    this.lastModalResult = await this.modalService.showInfo(
      'Information',
      'This is an informational modal. It provides helpful information to the user.'
    );
  }

  async showSuccessModal() {
    this.lastModalResult = await this.modalService.showSuccess(
      'Success!',
      'Your operation completed successfully. Everything is working as expected.'
    );
  }

  async showWarningModal() {
    this.lastModalResult = await this.modalService.showWarning(
      'Warning',
      'Please be careful. This action might have consequences that you should consider.'
    );
  }

  async showErrorModal() {
    this.lastModalResult = await this.modalService.showError(
      'Error Occurred',
      'Something went wrong. Please try again or contact support if the problem persists.'
    );
  }

  async showConfirmationModal() {
    this.lastModalResult = await this.modalService.showConfirmation(
      'Confirm Action',
      'Are you sure you want to proceed with this action? This cannot be undone.',
      'Yes, Proceed',
      'Cancel'
    );
  }
}