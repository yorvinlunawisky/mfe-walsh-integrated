import { Component, OnInit } from '@angular/core';

interface FollowUpItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  assignee: string;
  status: 'pending' | 'in-progress' | 'completed';
  location: string;
}

@Component({
  selector: 'app-follow-up',
  template: `
    <div class="follow-up-container p-4 space-y-6">
      <!-- Header -->
      <div class="text-center py-4">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Follow-Up</h1>
        <p class="text-gray-600">Track and manage inspection follow-ups</p>
      </div>
      
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-2xl font-bold text-red-600">{{getCountByStatus('pending')}}</p>
              <p class="text-sm text-gray-600">Pending</p>
            </div>
            <i class="pi pi-clock text-red-500 text-2xl"></i>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-2xl font-bold text-blue-600">{{getCountByStatus('in-progress')}}</p>
              <p class="text-sm text-gray-600">In Progress</p>
            </div>
            <i class="pi pi-cog text-blue-500 text-2xl"></i>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-2xl font-bold text-green-600">{{getCountByStatus('completed')}}</p>
              <p class="text-sm text-gray-600">Completed</p>
            </div>
            <i class="pi pi-check-circle text-green-500 text-2xl"></i>
          </div>
        </div>
      </div>
      
      <!-- Follow-up Items -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-gray-800 flex items-center">
            <i class="pi pi-list text-blue-500 mr-2"></i>
            Follow-up Items
          </h2>
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
            <i class="pi pi-plus mr-2"></i>
            Add Follow-up
          </button>
        </div>
        
        <div class="space-y-4">
          <div *ngFor="let item of followUpItems" 
               class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="font-semibold text-gray-800">{{item.title}}</h3>
                  <span [class]="'inline-flex px-2 py-1 rounded-full text-xs font-medium ' + getPriorityClass(item.priority)">
                    {{item.priority | titlecase}}
                  </span>
                  <span [class]="'inline-flex px-2 py-1 rounded-full text-xs font-medium ' + getStatusClass(item.status)">
                    {{item.status | titlecase}}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mb-2">{{item.description}}</p>
                <div class="flex items-center space-x-4 text-xs text-gray-500">
                  <span class="flex items-center">
                    <i class="pi pi-map-marker mr-1"></i>
                    {{item.location}}
                  </span>
                  <span class="flex items-center">
                    <i class="pi pi-user mr-1"></i>
                    {{item.assignee}}
                  </span>
                  <span class="flex items-center">
                    <i class="pi pi-calendar mr-1"></i>
                    Due: {{item.dueDate}}
                  </span>
                </div>
              </div>
              <div class="flex space-x-2">
                <button class="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                  <i class="pi pi-eye"></i>
                </button>
                <button class="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors duration-200">
                  <i class="pi pi-check"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .follow-up-container {
      max-width: 1000px;
      margin: 0 auto;
    }
  `]
})
export class FollowUpComponent implements OnInit {
  
  followUpItems: FollowUpItem[] = [
    {
      id: '1',
      title: 'Fire Extinguisher Replacement',
      description: 'Replace expired fire extinguishers in Building A, Floor 2',
      priority: 'high',
      dueDate: 'Jan 20, 2024',
      assignee: 'John Smith',
      status: 'pending',
      location: 'Building A, Floor 2'
    },
    {
      id: '2',
      title: 'Emergency Lighting Repair',
      description: 'Fix malfunctioning emergency lights in the main corridor',
      priority: 'medium',
      dueDate: 'Jan 22, 2024',
      assignee: 'Sarah Johnson',
      status: 'in-progress',
      location: 'Main Corridor'
    },
    {
      id: '3',
      title: 'Safety Sign Installation',
      description: 'Install missing safety signs near chemical storage area',
      priority: 'medium',
      dueDate: 'Jan 18, 2024',
      assignee: 'Mike Wilson',
      status: 'completed',
      location: 'Chemical Storage'
    },
    {
      id: '4',
      title: 'HVAC Filter Replacement',
      description: 'Replace dirty HVAC filters in office areas',
      priority: 'low',
      dueDate: 'Jan 25, 2024',
      assignee: 'Lisa Brown',
      status: 'pending',
      location: 'Office Areas'
    }
  ];
  
  constructor() {}
  
  ngOnInit(): void {
    console.log('Follow-up component loaded');
  }
  
  getCountByStatus(status: string): number {
    return this.followUpItems.filter(item => item.status === status).length;
  }
  
  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}