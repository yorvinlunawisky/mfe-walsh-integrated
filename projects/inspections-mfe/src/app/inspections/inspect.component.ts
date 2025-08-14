import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface Assignment {
  id: string;
  name: string;
  description: string;
  checklist?: Checklist;
}

interface Checklist {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  estimatedTime: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'operator' | 'manager';
}

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.scss']
})
export class InspectComponent implements OnInit, OnDestroy {
  
  inspectionForm: FormGroup;
  private destroy$ = new Subject<void>();
  
  // Data arrays
  assignments: Assignment[] = [
    {
      id: '1',
      name: 'Building A - Fire Safety',
      description: 'Complete fire safety inspection',
      checklist: {
        id: 'c1',
        name: 'Fire Safety Checklist',
        description: 'Standard fire safety inspection checklist',
        itemCount: 25,
        estimatedTime: 45
      }
    },
    {
      id: '2',
      name: 'Building B - Electrical Systems',
      description: 'Electrical systems inspection',
      checklist: {
        id: 'c2',
        name: 'Electrical Safety Checklist',
        description: 'Comprehensive electrical safety inspection',
        itemCount: 18,
        estimatedTime: 30
      }
    },
    {
      id: '3',
      name: 'Building C - HVAC Systems',
      description: 'HVAC systems maintenance check',
      checklist: {
        id: 'c3',
        name: 'HVAC Maintenance Checklist',
        description: 'Heating, ventilation, and air conditioning inspection',
        itemCount: 32,
        estimatedTime: 60
      }
    }
  ];

  operators: User[] = [
    { id: '1', name: 'John Smith', email: 'john.smith@walsh.com', role: 'operator' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@walsh.com', role: 'operator' },
    { id: '3', name: 'Mike Wilson', email: 'mike.wilson@walsh.com', role: 'operator' }
  ];

  managers: User[] = [
    { id: '4', name: 'Emily Davis', email: 'emily.davis@walsh.com', role: 'manager' },
    { id: '5', name: 'Robert Brown', email: 'robert.brown@walsh.com', role: 'manager' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.inspectionForm = this.createForm();
  }

  ngOnInit(): void {
    this.setupFormSubscriptions();
    console.log('Inspect component loaded');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Create the inspection form
   */
  private createForm(): FormGroup {
    return this.fb.group({
      assignment: ['', Validators.required],
      operator: ['', Validators.required],
      manager: [''] // Optional field
    });
  }

  /**
   * Setup form subscriptions
   */
  private setupFormSubscriptions(): void {
    // Watch for assignment changes to update checklist display
    this.inspectionForm.get('assignment')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(assignmentId => {
        console.log('Assignment changed:', assignmentId);
      });
  }

  /**
   * Get the selected assignment object
   */
  get selectedAssignment(): Assignment | undefined {
    const assignmentId = this.inspectionForm.get('assignment')?.value;
    return this.assignments.find(a => a.id === assignmentId);
  }

  /**
   * Check if there are assigned operators
   */
  get hasAssignedOperators(): boolean {
    return this.operators.length > 0;
  }

  /**
   * Check if there are assigned managers
   */
  get hasAssignedManagers(): boolean {
    return this.managers.length > 0;
  }

  /**
   * Check if inspection can be started
   */
  get canStartInspection(): boolean {
    return this.inspectionForm.valid && this.hasAssignedOperators;
  }

  /**
   * Start the inspection
   */
  startInspection(): void {
    if (this.inspectionForm.valid && this.canStartInspection) {
      const formData = this.inspectionForm.value;
      
      console.log('Starting inspection with data:', formData);
      
      // In a real app, you would:
      // 1. Create the inspection record
      // 2. Navigate to the inspection interface
      // this.inspectionService.createInspection(formData)
      //   .subscribe(inspection => {
      //     this.router.navigate(['/inspection', inspection.id]);
      //   });
      
      // For now, just navigate to a placeholder
      this.router.navigate(['/inspection/active'], {
        queryParams: {
          assignment: formData.assignment,
          operator: formData.operator,
          manager: formData.manager || null
        }
      });
    }
  }

  /**
   * Show all operators
   */
  showAllOperators(): void {
    console.log('Loading all operators...');
    // In a real app, you would load all operators from the service
    // this.userService.getAllOperators()
    //   .subscribe(operators => {
    //     this.operators = operators;
    //   });
  }

  /**
   * Show all managers
   */
  showAllManagers(): void {
    console.log('Loading all managers...');
    // In a real app, you would load all managers from the service
    // this.userService.getAllManagers()
    //   .subscribe(managers => {
    //     this.managers = managers;
    //   });
  }
}