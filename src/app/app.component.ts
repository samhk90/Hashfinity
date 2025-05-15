import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('slideInOut', [
      state('closed', style({
        height: '0',
        opacity: '0',
        transform: 'translateY(-10px)'
      })),
      state('open', style({
        height: '*',
        opacity: '1',
        transform: 'translateY(0)'
      })),
      transition('closed => open', [
        animate('300ms ease-in-out')
      ]),
      transition('open => closed', [
        animate('250ms ease-in-out')
      ])
    ])
  ]
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

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMobileMenuOpen = this.isMenuOpen; // Sync both menu state variables
  }
}
