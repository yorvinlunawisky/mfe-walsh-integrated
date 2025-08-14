import { Component, Input } from '@angular/core';
import { ThemeService, Theme } from '../../../core/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() showLabel: boolean = false;
  @Input() variant: 'button' | 'switch' = 'button';
  
  currentTheme$: Observable<Theme> = this.themeService.currentTheme$;
  
  constructor(private themeService: ThemeService) {}
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  
  get isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
  
  get sizeClass(): string {
    const sizeMap = {
      small: 'w-8 h-8 text-sm',
      medium: 'w-10 h-10 text-base',
      large: 'w-12 h-12 text-lg'
    };
    return sizeMap[this.size];
  }
}