import { Component, OnInit } from '@angular/core';

interface SupportItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: string;
}

interface FAQ {
  question: string;
  answer: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-support',
  template: `
    <div class="support-container p-4 space-y-6">
      <!-- Header -->
      <div class="text-center py-4">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Support</h1>
        <p class="text-gray-600">Get help and find answers to your questions</p>
      </div>
      
      <!-- Quick Help Options -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div *ngFor="let item of supportOptions" 
             class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <i [class]="item.icon + ' text-white text-xl'"></i>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-800 mb-1">{{item.title}}</h3>
              <p class="text-sm text-gray-600 mb-2">{{item.description}}</p>
              <span class="text-blue-600 text-sm font-medium">{{item.action}}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contact Information -->
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
        <h2 class="text-lg font-semibold mb-4 flex items-center">
          <i class="pi pi-phone mr-2"></i>
          Emergency Contact
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p class="text-sm opacity-90 mb-1">24/7 Support Hotline</p>
            <p class="text-xl font-bold">1-800-WALSH-HELP</p>
          </div>
          <div>
            <p class="text-sm opacity-90 mb-1">Email Support</p>
            <p class="text-lg font-semibold">support@walsh.com</p>
          </div>
        </div>
      </div>
      
      <!-- FAQ Section -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800 mb-6 flex items-center">
          <i class="pi pi-question-circle text-blue-500 mr-2"></i>
          Frequently Asked Questions
        </h2>
        
        <div class="space-y-4">
          <div *ngFor="let faq of faqs; let i = index" 
               class="border border-gray-200 rounded-lg overflow-hidden">
            <button 
              (click)="toggleFAQ(i)"
              class="w-full text-left p-4 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between">
              <span class="font-medium text-gray-800">{{faq.question}}</span>
              <i [class]="'pi transition-transform duration-200 ' + (faq.expanded ? 'pi-chevron-up' : 'pi-chevron-down')"></i>
            </button>
            <div *ngIf="faq.expanded" class="px-4 pb-4">
              <p class="text-gray-600 leading-relaxed">{{faq.answer}}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- App Information -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <i class="pi pi-info-circle text-blue-500 mr-2"></i>
          App Information
        </h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Version:</span>
              <span class="font-medium">2.1.0</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Last Updated:</span>
              <span class="font-medium">Jan 15, 2024</span>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Build:</span>
              <span class="font-medium">#2024.01.15</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Environment:</span>
              <span class="font-medium">Production</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .support-container {
      max-width: 800px;
      margin: 0 auto;
    }
  `]
})
export class SupportComponent implements OnInit {
  
  supportOptions: SupportItem[] = [
    {
      id: '1',
      title: 'User Guide',
      description: 'Learn how to use the inspection app effectively',
      icon: 'pi pi-book',
      action: 'View Guide →'
    },
    {
      id: '2',
      title: 'Video Tutorials',
      description: 'Watch step-by-step video instructions',
      icon: 'pi pi-play',
      action: 'Watch Videos →'
    },
    {
      id: '3',
      title: 'Report Issue',
      description: 'Found a bug or have a suggestion?',
      icon: 'pi pi-exclamation-triangle',
      action: 'Report Now →'
    },
    {
      id: '4',
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: 'pi pi-comments',
      action: 'Start Chat →'
    }
  ];
  
  faqs: FAQ[] = [
    {
      question: 'How do I start a new inspection?',
      answer: 'Navigate to the "Inspect Now" tab and tap on "New Inspection". Select your assignment and operator, then tap "Start Inspection" to begin.',
      expanded: false
    },
    {
      question: 'Can I work offline?',
      answer: 'Yes, the app supports offline mode. Make sure to sync your data when you have an internet connection to ensure all information is up to date.',
      expanded: false
    },
    {
      question: 'How do I add photos to an inspection?',
      answer: 'During an inspection, tap the camera icon next to any checklist item. You can take new photos or select from your device gallery.',
      expanded: false
    },
    {
      question: 'Where can I view completed inspections?',
      answer: 'Go to the Dashboard and scroll down to see recent activity, or use the "View All" button to see a complete list of completed inspections.',
      expanded: false
    },
    {
      question: 'How do I update my profile information?',
      answer: 'Profile settings can be accessed through the main menu. Contact your administrator if you need to change role-specific information.',
      expanded: false
    }
  ];
  
  constructor() {}
  
  ngOnInit(): void {
    console.log('Support component loaded');
  }
  
  toggleFAQ(index: number): void {
    this.faqs[index].expanded = !this.faqs[index].expanded;
  }
}