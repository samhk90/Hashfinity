import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(this.getInitialThemeState());

  constructor() {
    // Apply initial theme
    this.applyTheme(this.darkMode.value);
  }

  private getInitialThemeState(): boolean {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  isDarkTheme(): boolean {
    return this.darkMode.value;
  }

  toggleTheme(): void {
    console.log('Current theme state before toggle:', this.darkMode.value ? 'dark' : 'light');
    const newValue = !this.darkMode.value;
    console.log('New theme state after toggle:', newValue ? 'dark' : 'light');
    this.darkMode.next(newValue);
    this.applyTheme(newValue);
  }

  private applyTheme(isDark: boolean): void {
    console.log('Applying theme:', isDark ? 'dark' : 'light');
    console.log('Current classList:', document.documentElement.classList.toString());
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    console.log('Updated classList:', document.documentElement.classList.toString());
  }
}
