import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import all the components
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { HowweworkComponent } from './howwework/howwework.component';
import { ProjectsComponent } from './projects/projects.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, HomeComponent, AboutComponent, ServicesComponent, ContactComponent, HowweworkComponent, ProjectsComponent],
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
  activeSection = 'home'; // Track active section

  isMobileMenuOpen = false;
  private sections = ['home', 'about', 'projects', 'services', 'howwework', 'contact'];
  
  constructor(public themeService: ThemeService) {
    // Theme service now handles light theme only
  }

  ngOnInit() {
    this.checkScroll();
    this.checkActiveSection(); // Start checking for active sections
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    this.isScrolled = window.scrollY > 20;
    this.checkActiveSection(); // Check active section on scroll
  }

  checkActiveSection() {
    const scrollPosition = window.scrollY + 100; // Offset for better detection
    
    for (const section of this.sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  setActiveSection(section: string) {
    this.activeSection = section;
    // Close mobile menu when navigation item is clicked
    this.isMenuOpen = false;
    this.isMobileMenuOpen = false;
    
    // Smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMobileMenuOpen = this.isMenuOpen; // Sync both menu state variables
  }
}
