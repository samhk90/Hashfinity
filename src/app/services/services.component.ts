import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollAnimationService } from '../services/scroll-animation.service';

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  colorClass: string;
  iconColorClass: string;
  isHovered?: boolean;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, AfterViewInit, OnDestroy {
  private cleanup: (() => void) | undefined;
  private isInitialized = false;

  // Card color variant with better visibility
  private cardColor = 'bg-white hover:bg-gray-50/90 border border-gray-200/50 hover:border-current dark:bg-gray-900 dark:hover:bg-gray-800/90';

  // Icon color variants with stronger colors
  private iconColorVariants = [
    'bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700',  // Branding
    'bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',  // Web Dev
    'bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',  // Mobile
    'bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',  // ERP
    'bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700',  // Marketing
    'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'  // Cloud
  ];

  services: Service[] = [
    {
      id: 'branding',
      icon: 'palette',
      title: 'Branding Graphic Design',
      description: 'Create a strong, memorable brand identity that resonates with your target audience.',
      features: [
        'Logo & Visual Identity',
        'Business Collateral Design',
        'Rebranding Solutions',
        'Social Media Creatives',
        'Digital Ad Creatives',
        'Brand Style Guides'
      ],
      colorClass: this.cardColor,
      iconColorClass: this.iconColorVariants[0]
    },
    {
      id: 'web-dev',
      icon: 'laptop-code',
      title: 'Website & Web-App Development',
      description: 'Custom, scalable websites and web applications that drive business growth.',
      features: [
        'Business & Portfolio Websites',
        'E-commerce Development',
        'Custom CMS Websites',
        'Landing Pages & Funnels',
        'UI/UX Design',
        'Hosting & Domain Services'
      ],
      colorClass: this.cardColor,
      iconColorClass: this.iconColorVariants[1]
    },
    {
      id: 'mobile-dev',
      icon: 'mobile-alt',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: [
        'Android App Development',
        'iOS App Development',
        'Cross-Platform Apps',
        'Progressive Web Apps (PWA)',
        'App UI/UX Design',
        'App Store Deployment & Maintenance'
      ],
      colorClass: this.cardColor,
      iconColorClass: this.iconColorVariants[2]
    },
    {
      id: 'erp-solutions',
      icon: 'boxes',
      title: 'ERP & Custom Software',
      description: 'Comprehensive enterprise solutions to streamline your business operations.',
      features: [
        'ERP System Development',
        'Custom Desktop & Web Applications',
        'SaaS Solutions',
        'API Integrations',
        'Employee Management System',
        'Custom Business Solutions'
      ],
      colorClass: this.cardColor,
      iconColorClass: this.iconColorVariants[3]
    },
    {
      id: 'digital-marketing',
      icon: 'bullhorn',
      title: 'Digital Marketing Services',
      description: 'Strategic digital marketing solutions to boost your online presence.',
      features: [
        'Social Media Marketing',
        'SEO Optimization',
        'Google & Meta Ads',
        'Email Marketing',
        'Content Marketing',
        'Performance Analytics'
      ],
      colorClass: this.cardColor,
      iconColorClass: this.iconColorVariants[4]
    },
    {
      id: 'cloud-solutions',
      icon: 'cloud',
      title: 'Cloud Solutions',
      description: 'Enterprise-grade cloud infrastructure and solutions. We help businesses migrate, optimize, and scale their operations in the cloud.',
      features: [
        'Cloud migration',
        'Infrastructure as Code',
        'DevOps automation',
        'Cloud security'
      ],
      colorClass: this.cardColor,
      iconColorClass: this.iconColorVariants[5]
    }
  ];

  constructor(
    private elementRef: ElementRef,
    private scrollAnimationService: ScrollAnimationService
  ) {
    // Initialize services with consistent card colors but unique icon colors
    this.services = this.services.map((service, index) => ({
      ...service,
      colorClass: this.cardColor,
      iconColorClass: this.iconColorVariants[index % this.iconColorVariants.length]
    }));
  }

  ngOnInit() {
    // No initialization in ngOnInit to avoid race conditions
  }

  ngAfterViewInit() {
    // Initialize animations after view is fully rendered
    requestAnimationFrame(() => {
      if (!this.isInitialized) {
        this.initializeAnimations();
        this.isInitialized = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.cleanup) {
      this.cleanup();
    }
  }

  private initializeAnimations() {
    // Initialize scroll animations
    this.cleanup = this.scrollAnimationService.initScrollAnimation(this.elementRef);

    // Add stagger effect to feature items with smoother timing
    const cards = this.elementRef.nativeElement.querySelectorAll('.service-card');
    cards.forEach((card: Element, cardIndex: number) => {
      // Add card stagger delay
      (card as HTMLElement).style.transitionDelay = `${cardIndex * 100}ms`;
      
      const features = card.querySelectorAll('.feature-item');
      features.forEach((feature: Element, index: number) => {
        // Add feature stagger delay
        (feature as HTMLElement).style.transitionDelay = `${(cardIndex * 100) + (index * 50)}ms`;
      });
    });
  }

  // Method to handle card hover state
  onCardHover(service: Service, isHovered: boolean) {
    service.isHovered = isHovered;
  }
}
