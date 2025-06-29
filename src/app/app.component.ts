import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
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
export class AppComponent implements OnInit, OnDestroy {
  private observer: IntersectionObserver | null = null;
  private observedElements: Set<Element> = new Set();
  title = 'hashfinity';
  favIcon = 'assets/logo.jpg';
  isMenuOpen = false;
  isScrolled = false   ;
  currentYear = new Date().getFullYear();
  activeSection = 'home'; // Track active section
  private sections = ['home', 'about', 'projects', 'services', 'howwework', 'contact'];
  isMobileMenuOpen = false; // Track mobile menu state
  
  constructor(public themeService: ThemeService) {
    // Theme service now handles light theme only
  }

  ngOnInit() {
    this.checkScroll();
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is 20% from top
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (this.sections.includes(sectionId)) {
            this.activeSection = sectionId;
          }
        }
      });
    }, options);

    // Wait for DOM to be ready, then observe sections
    setTimeout(() => {
      this.sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          this.observer?.observe(element);
          this.observedElements.add(element);
        }
      });
    }, 100);
  }

  setActiveSection(section: string) {
    this.activeSection = section;
    this.closeMobileMenu(); // Close mobile menu when navigating
    
    // Smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}
