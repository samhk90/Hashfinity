import { Injectable, ElementRef, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {
  private observers: Map<Element, IntersectionObserver> = new Map();

  constructor(private ngZone: NgZone) {}

  initScrollAnimation(elementRef: ElementRef) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.ngZone.run(() => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add stagger effect to child elements
            const children = entry.target.querySelectorAll('.stagger-item');
            children.forEach((child, index) => {
              (child as HTMLElement).style.transitionDelay = `${index * 100}ms`;
              child.classList.add('visible');
            });
          }
        });
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    // Set initial visibility for elements already in view
    setTimeout(() => {
      const scrollElements = elementRef.nativeElement.querySelectorAll(
        '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .stagger-item'
      );
      
      scrollElements.forEach((el: Element) => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
        
        if (isInView) {
          el.classList.add('visible');
        }
        
        observer.observe(el);
        this.observers.set(el, observer);
      });
    }, 100);

    return () => {
      const scrollElements = elementRef.nativeElement.querySelectorAll(
        '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .stagger-item'
      );
      scrollElements.forEach((el: Element) => {
        const observer = this.observers.get(el);
        if (observer) {
          observer.disconnect();
          this.observers.delete(el);
        }
      });
    };
  }
}