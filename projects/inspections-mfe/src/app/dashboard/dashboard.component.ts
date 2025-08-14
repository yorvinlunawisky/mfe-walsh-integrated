import { Component, OnInit } from '@angular/core';

interface DashboardCard {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

interface FailedQuestion {
  question: string;
  failureCount: number;
}

interface RecentActivity {
  id: string;
  title: string;
  type: 'inspection' | 'follow-up' | 'completed';
  time: string;
  location: string;
}

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container p-4 space-y-6">
      <!-- Header -->
      <div class="text-center py-4">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p class="text-gray-600">Welcome back! Here's your inspection overview</p>
      </div>
      
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div 
          *ngFor="let card of dashboardCards" 
          class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div class="flex items-center justify-between mb-3">
            <div [class]="'w-10 h-10 rounded-xl flex items-center justify-center ' + card.color">
              <i [class]="card.icon + ' text-white text-lg'"></i>
            </div>
            <div *ngIf="card.trend" class="flex items-center space-x-1">
              <i [class]="'pi text-xs ' + (card.trend.isPositive ? 'pi-arrow-up text-green-500' : 'pi-arrow-down text-red-500')"></i>
              <span [class]="'text-xs font-medium ' + (card.trend.isPositive ? 'text-green-500' : 'text-red-500')">
                {{card.trend.value}}%
              </span>
            </div>
          </div>
          <div class="space-y-1">
            <p class="text-2xl font-bold text-gray-800">{{card.value}}</p>
            <p class="text-sm text-gray-600">{{card.title}}</p>
          </div>
        </div>
      </div>
      
      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Top 5 Failed Questions -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-gray-800 flex items-center">
                <i class="pi pi-exclamation-triangle text-red-500 mr-2"></i>
                Top 5 Failed Questions
              </h2>
            </div>
            
            <div class="space-y-4">
              <div class="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 border-b border-gray-100 pb-2">
                <div class="col-span-8">Question</div>
                <div class="col-span-4 text-center">Failure Count</div>
              </div>
              
              <div *ngFor="let item of failedQuestions; let i = index" 
                   class="grid grid-cols-12 gap-4 items-center py-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div class="col-span-8">
                  <div class="flex items-center space-x-3">
                    <div class="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {{i + 1}}
                    </div>
                    <p class="text-sm text-gray-700 leading-relaxed">{{item.question}}</p>
                  </div>
                </div>
                <div class="col-span-4 text-center">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    {{item.failureCount}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Recent Activity -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-gray-800 flex items-center">
                <i class="pi pi-clock text-blue-500 mr-2"></i>
                Recent Activity
              </h2>
              <button class="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200">
                View All
              </button>
            </div>
            
            <div class="space-y-4">
              <div *ngFor="let activity of recentActivities" 
                   class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div [class]="getActivityIconClass(activity.type)">
                  <i [class]="getActivityIcon(activity.type) + ' text-white text-xs'"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-800 truncate">{{activity.title}}</p>
                  <p class="text-xs text-gray-500 mt-1">{{activity.location}}</p>
                  <p class="text-xs text-gray-400 mt-1">{{activity.time}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1400px;
      margin: 0 auto;
    }
    
    @media (max-width: 640px) {
      .dashboard-container {
        padding: 1rem;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  
  dashboardCards: DashboardCard[] = [
    {
      title: 'Total Inspections',
      value: 247,
      icon: 'pi pi-clipboard',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Pending Reviews',
      value: 18,
      icon: 'pi pi-clock',
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      trend: { value: 5, isPositive: false }
    },
    {
      title: 'Completed Today',
      value: 12,
      icon: 'pi pi-check-circle',
      color: 'bg-gradient-to-r from-green-500 to-emerald-600',
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Critical Issues',
      value: 3,
      icon: 'pi pi-exclamation-triangle',
      color: 'bg-gradient-to-r from-red-500 to-pink-600',
      trend: { value: 2, isPositive: false }
    },
    {
      title: 'Success Rate',
      value: '94%',
      icon: 'pi pi-chart-line',
      color: 'bg-gradient-to-r from-purple-500 to-indigo-600',
      trend: { value: 3, isPositive: true }
    }
  ];
  
  failedQuestions: FailedQuestion[] = [
    {
      question: 'Are all fire extinguishers properly mounted and accessible?',
      failureCount: 23
    },
    {
      question: 'Is the emergency lighting system functioning correctly?',
      failureCount: 19
    },
    {
      question: 'Are exit signs clearly visible and illuminated?',
      failureCount: 15
    },
    {
      question: 'Is the sprinkler system inspection up to date?',
      failureCount: 12
    },
    {
      question: 'Are safety data sheets readily available for all chemicals?',
      failureCount: 8
    }
  ];
  
  recentActivities: RecentActivity[] = [
    {
      id: '1',
      title: 'Building A Fire Safety',
      type: 'completed',
      time: '2 hours ago',
      location: 'Main Building'
    },
    {
      id: '2',
      title: 'Electrical System Check',
      type: 'inspection',
      time: '4 hours ago',
      location: 'Warehouse B'
    },
    {
      id: '3',
      title: 'HVAC Maintenance',
      type: 'follow-up',
      time: '1 day ago',
      location: 'Office Floor 3'
    },
    {
      id: '4',
      title: 'Safety Equipment Audit',
      type: 'completed',
      time: '2 days ago',
      location: 'Factory Floor'
    },
    {
      id: '5',
      title: 'Emergency Exit Review',
      type: 'inspection',
      time: '3 days ago',
      location: 'Building C'
    }
  ];
  
  constructor() {}
  
  ngOnInit(): void {
    console.log('Dashboard component loaded');
  }
  
  getActivityIconClass(type: string): string {
    const baseClass = 'w-8 h-8 rounded-full flex items-center justify-center ';
    switch (type) {
      case 'completed':
        return baseClass + 'bg-green-500';
      case 'inspection':
        return baseClass + 'bg-blue-500';
      case 'follow-up':
        return baseClass + 'bg-yellow-500';
      default:
        return baseClass + 'bg-gray-500';
    }
  }
  
  getActivityIcon(type: string): string {
    switch (type) {
      case 'completed':
        return 'pi pi-check';
      case 'inspection':
        return 'pi pi-search';
      case 'follow-up':
        return 'pi pi-clock';
      default:
        return 'pi pi-circle';
    }
  }
}