import { Injectable, ElementRef, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {
  private observers: Map<Element, IntersectionObserver> = new Map();

  constructor(private ngZone: NgZone) {}

  initScrollAnimation(elementRef: ElementRef) {
    // Create the observer with improved options
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.ngZone.run(() => {
          if (entry.isIntersecting) {
            // Add visible class with a small delay to ensure smooth animation
            requestAnimationFrame(() => {
              entry.target.classList.add('visible');
              
              // Add stagger effect to child elements
              const children = entry.target.querySelectorAll('.stagger-item');
              children.forEach((child, index) => {
                (child as HTMLElement).style.transitionDelay = `${index * 100}ms`;
                child.classList.add('visible');
              });
            });
          }
        });
      });
    }, {
      threshold: 0.1,
      rootMargin: '20px 0px', // Reduced margin for smoother triggering
    });

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupObservers(elementRef, observer));
    } else {
      this.setupObservers(elementRef, observer);
    }

    return () => this.cleanup();
  }

  private setupObservers(elementRef: ElementRef, observer: IntersectionObserver) {
    // Get all animated elements
    const scrollElements = elementRef.nativeElement.querySelectorAll(
      '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .stagger-item, .service-card'
    );

    // Set initial state and observe elements
    scrollElements.forEach((el: Element) => {
      // Reset any existing animations
      el.classList.remove('visible');
      
      // Check if element is already in view
      const rect = el.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
      
      if (isInView) {
        // Add visible class immediately for elements in view
        requestAnimationFrame(() => {
          el.classList.add('visible');
        });
      }
      
      // Start observing the element
      observer.observe(el);
      this.observers.set(el, observer);
    });
  }

  private cleanup() {
    this.observers.forEach((observer, element) => {
      observer.unobserve(element);
      observer.disconnect();
    });
    this.observers.clear();
  }
}