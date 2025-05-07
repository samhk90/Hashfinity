import { Component, ElementRef, OnInit, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

type IconType = 'laptop-code' | 'mobile-alt' | 'boxes' | 'shopping-cart' | 'bullhorn' | 'palette';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  // animations: [
  //   trigger('fadeInUp', [
  //     transition(':enter', [
  //       style({ opacity: 0, transform: 'translateY(20px)' }),
  //       animate('0.6s cubic-bezier(0.35, 0, 0.25, 1)', 
  //         style({ opacity: 1, transform: 'translateY(0)' }))
  //     ])
  //   ]),
  //   trigger('staggerFadeIn', [
  //     transition(':enter', [
  //       query('.animate-item', [
  //         style({ opacity: 0, transform: 'translateY(50px)' }),
  //         stagger('0.2s', [
  //           animate('0.6s cubic-bezier(0.35, 0, 0.25, 1)',
  //             style({ opacity: 1, transform: 'translateY(0)' }))
  //         ])
  //       ])
  //     ])
  //   ])
  // ]
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  private routerSubscription: Subscription;
  private observer: IntersectionObserver | null = null;
  private observedElements: Set<Element> = new Set();

  constructor(
    private elementRef: ElementRef, 
    private router: Router,
    private ngZone: NgZone
  ) {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.resetAnimations();
      this.checkElementsInView();
    });
  }

  ngOnInit() {
    // Initialize IntersectionObserver
    this.initializeObserver();
  }

  ngAfterViewInit() {
    // Set up observers for all animated elements
    this.setupAnimationObservers();
    
    // Initial check for elements already in view
    setTimeout(() => {
      this.checkElementsInView();
    }, 100);
  }

  private initializeObserver() {
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Run inside NgZone when adding visible class
              this.ngZone.run(() => {
                // Add visible class
                entry.target.classList.add('visible');
                
                // For service cards, keep observing to handle re-entry animations
                if (!entry.target.classList.contains('service-card')) {
                  this.observer?.unobserve(entry.target);
                  this.observedElements.delete(entry.target);
                }
              });
            } else {
              // Remove visible class from service cards when they leave viewport
              if (entry.target.classList.contains('service-card')) {
                entry.target.classList.remove('visible');
              }
            }
          });
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1 // Trigger when at least 10% of the element is visible
        }
      );
    });
  }

  private setupAnimationObservers() {
    const animationClasses = ['scroll-animate', 'scroll-animate-left', 'scroll-animate-right', 'service-card'];
    
    animationClasses.forEach(className => {
      const elements = this.elementRef.nativeElement.getElementsByClassName(className);
      Array.from<Element>(elements).forEach((element) => {
        if (!this.observedElements.has(element)) {
          this.observer?.observe(element);
          this.observedElements.add(element);
        }
      });
    });
  }

  private checkElementsInView() {
    if (!this.observer) {
      this.initializeObserver();
    }
    this.setupAnimationObservers();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    
    // Cleanup observer
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.observedElements.clear();
  }

  private resetAnimations() {
    const animationClasses = ['scroll-animate', 'scroll-animate-left', 'scroll-animate-right'];
    
    animationClasses.forEach(className => {
      const elements = this.elementRef.nativeElement.getElementsByClassName(className);
      Array.from(elements).forEach((element: any) => {
        element.classList.remove('visible');
        // Re-observe the element after reset
        if (!this.observedElements.has(element) && this.observer) {
          this.observer.observe(element);
          this.observedElements.add(element);
        }
      });
    });
  }

  services = [
    {
      icon: 'laptop-code',
      title: 'Web Development',
      description: 'Custom, scalable, and high-performance websites & web apps tailored to your business needs.',
      benefit: 'One year of free support & maintenance included.'
    },
    {
      icon: 'mobile-alt',
      title: 'Mobile Apps',
      description: 'Native Android & iOS applications with seamless user experience.',
      benefit: 'Cross-platform efficiency with native performance.'
    },
    {
      icon: 'boxes',
      title: 'Business Systems',
      description: 'Streamline operations with automated inventory & business management solutions.',
      benefit: 'Reduce manual errors by up to 90%.'
    },
    {
      icon: 'shopping-cart',
      title: 'E-Commerce',
      description: 'High-converting online stores with secure payment integration.',
      benefit: 'Boost sales with optimized checkout flow.'
    },
    {
      icon: 'bullhorn',
      title: 'Digital Marketing',
      description: 'Data-driven strategies for enhanced brand visibility and lead generation.',
      benefit: 'Increase online presence & conversions.'
    },
    {
      icon: 'palette',
      title: 'UI/UX Design',
      description: 'Modern, intuitive interfaces that delight users and drive engagement.',
      benefit: 'User-centric design that converts.'
    }
  ];

  getIconPath(icon: string): string {
    const paths: Record<IconType, string> = {
      'laptop-code': 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      'mobile-alt': 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      'boxes': 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      'shopping-cart': 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      'bullhorn': 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
      'palette': 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
    };
    return paths[icon as IconType] || paths['laptop-code'];
  }
}
