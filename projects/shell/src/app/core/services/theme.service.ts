import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private readonly LIGHT_THEME = 'lara-light-blue';
  private readonly DARK_THEME = 'lara-dark-blue';
  
  private currentThemeSubject = new BehaviorSubject<Theme>('light');
  public currentTheme$: Observable<Theme> = this.currentThemeSubject.asObservable();
  
  constructor() {
    this.initializeTheme();
  }
  
  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    this.setTheme(theme);
  }
  
  setTheme(theme: Theme): void {
    this.currentThemeSubject.next(theme);
    localStorage.setItem(this.THEME_KEY, theme);
    this.updateThemeLink(theme);
    this.updateBodyClass(theme);
  }
  
  toggleTheme(): void {
    const currentTheme = this.currentThemeSubject.value;
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  getCurrentTheme(): Theme {
    return this.currentThemeSubject.value;
  }
  
  isDarkMode(): boolean {
    return this.currentThemeSubject.value === 'dark';
  }
  
  private updateThemeLink(theme: Theme): void {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    const themeName = theme === 'dark' ? this.DARK_THEME : this.LIGHT_THEME;
    
    if (themeLink) {
      themeLink.href = `assets/themes/${themeName}/theme.css`;
    } else {
      const head = document.getElementsByTagName('head')[0];
      const newThemeLink = document.createElement('link');
      newThemeLink.id = 'app-theme';
      newThemeLink.rel = 'stylesheet';
      newThemeLink.type = 'text/css';
      newThemeLink.href = `assets/themes/${themeName}/theme.css`;
      head.appendChild(newThemeLink);
    }
  }
  
  private updateBodyClass(theme: Theme): void {
    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(`${theme}-theme`);
  }
}