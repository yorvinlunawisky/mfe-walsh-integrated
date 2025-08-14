import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  template: `
    <div class="placeholder-container">
      <div class="placeholder-content">
        <div class="placeholder-icon">
          <i class="pi pi-cog"></i>
        </div>
        <h2 class="placeholder-title">{{ pageTitle }} - Coming Soon</h2>
        <p class="placeholder-description">
          This feature is currently under development and will be available soon.
        </p>
        <div class="placeholder-actions">
          <button class="btn btn-primary" (click)="goBack()">
            <i class="pi pi-arrow-left"></i>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .placeholder-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      padding: 2rem;
    }

    .placeholder-content {
      text-align: center;
      max-width: 500px;
      padding: 3rem;
      background: white;
      border-radius: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .placeholder-icon {
      margin-bottom: 1.5rem;
    }

    .placeholder-icon i {
      font-size: 4rem;
      color: #6b7280;
    }

    .placeholder-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 1rem 0;
    }

    .placeholder-description {
      color: #6b7280;
      line-height: 1.6;
      margin: 0 0 2rem 0;
    }

    .placeholder-actions {
      display: flex;
      justify-content: center;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 0.375rem;
      font-weight: 500;
      cursor: pointer;
      border: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
      text-decoration: none;
    }

    .btn-primary {
      background-color: #3b82f6;
      color: white;
    }

    .btn-primary:hover {
      background-color: #2563eb;
    }
  `]
})
export class PlaceholderComponent implements OnInit {

  pageTitle: string = 'Page';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the page title from route data
    this.route.data.subscribe(data => {
      this.pageTitle = data['title'] || 'Page';
    });
  }

  goBack(): void {
    window.history.back();
  }

}