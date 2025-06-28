import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor() {
    // Ensure light theme is always applied
    this.applyLightTheme();
  }

  isDarkTheme(): boolean {
    // Always return false as we only support light theme
    return false;
  }

  private applyLightTheme(): void {
    // Remove any dark theme classes and set light theme
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}
