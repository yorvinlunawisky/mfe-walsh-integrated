import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor(
    private router: Router,
    private location: Location
  ) {}

  /**
   * Navigate back to the previous page
   */
  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      // If no history, go to dashboard
      this.goHome();
    }
  }

  /**
   * Navigate to the dashboard/home page
   */
  goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  /**
   * Navigate to help center
   */
  goToHelp(): void {
    // Navigate to help page or open external help URL
    this.router.navigate(['/help']);
    // Or for external URL:
    // window.open('https://help.walsh.com', '_blank');
  }

  /**
   * Open contact support
   */
  contactSupport(): void {
    // Navigate to contact page or open email client
    this.router.navigate(['/contact']);
    // Or for email:
    // window.location.href = 'mailto:support@walsh.com?subject=Need Help - 404 Error';
  }

  /**
   * Navigate to documentation
   */
  openDocumentation(): void {
    // Navigate to docs page or open external docs
    this.router.navigate(['/docs']);
    // Or for external URL:
    // window.open('https://docs.walsh.com', '_blank');
  }
}