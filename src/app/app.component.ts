import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'hashfinity';
  favIcon = 'assets/logo.jpg';
  isMenuOpen = false;
  isScrolled = false;
  currentYear = new Date().getFullYear();

  isDarkMode = false;
  isMobileMenuOpen = false;
  constructor(public themeService: ThemeService) {
    // Theme initialization is handled in the ThemeService constructor
  }

  ngOnInit() {
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleTheme(): void {

    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    this.themeService.toggleTheme();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.isMenuOpen = this.isMobileMenuOpen; // Sync both menu state variables
  }
}
