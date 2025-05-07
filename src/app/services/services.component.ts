import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollAnimationService } from '../services/scroll-animation.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit, OnDestroy {
  private cleanup: (() => void) | undefined;
  services = [
    {
      id: 'branding',
      title: 'Branding Services',
      icon: 'palette',
      description: 'Create a strong, memorable brand identity that resonates with your target audience.',
      features: [
        'Brand Strategy & Positioning',
        'Logo & Visual Identity',
        'Business Collateral Design',
        'Rebranding Solutions',
        'Packaging & Merchandise',
        'Personal & Influencer Branding'
      ],
      benefit: 'Build a compelling brand that stands out in the market.'
    },
    {
      id: 'web-dev',
      title: 'Website & Development',
      icon: 'laptop-code',
      description: 'Custom, scalable websites and web applications that drive business growth.',
      features: [
        'Business & Portfolio Websites',
        'E-commerce Development',
        'Custom CMS Websites',
        'Landing Pages & Funnels',
        'UI/UX Design',
        'Hosting & Domain Services'
      ],
      benefit: 'Get a website that converts visitors into customers.'
    },
    {
      id: 'mobile-dev',
      title: 'Mobile App Development',
      icon: 'mobile-alt',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: [
        'Android App Development',
        'iOS App Development',
        'Cross-Platform Apps',
        'Progressive Web Apps (PWA)',
        'App UI/UX Design',
        'App Store Deployment & Maintenance'
      ],
      benefit: 'Reach your users on any mobile platform.'
    },
    {
      id: 'erp-solutions',
      title: 'ERP & Custom Software',
      icon: 'boxes',
      description: 'Comprehensive enterprise solutions to streamline your business operations.',
      features: [
        'ERP System Development',
        'Custom Desktop & Web Applications',
        'SaaS Solutions',
        'API Integrations',
        'Employee Management System',
        'Custom Business Solutions'
      ],
      benefit: 'Automate and optimize your business processes.'
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing Services',
      icon: 'bullhorn',
      description: 'Strategic digital marketing solutions to boost your online presence.',
      features: [
        'Social Media Marketing',
        'SEO Optimization',
        'Google & Meta Ads',
        'Email Marketing',
        'Content Marketing',
        'Performance Analytics'
      ],
      benefit: 'Increase your digital footprint and ROI.'
    },
    {
      id: 'cloud-services',
      title: 'Cloud & IT Services',
      icon: 'cloud',
      description: 'Secure and scalable cloud solutions for your business needs.',
      features: [
        'Cloud Hosting (AWS, GCP, Azure)',
        'Database Management',
        'Server Maintenance & Security',
        'SSL Certificates',
        'Data Backup Solutions',
        'Firewall Configuration'
      ],
      benefit: 'Enterprise-grade infrastructure at your fingertips.'
    },
    {
      id: 'creative-design',
      title: 'Graphic & Creative Design',
      icon: 'pen-tool',
      description: 'Eye-catching designs that communicate your brand message effectively.',
      features: [
        'Social Media Creatives',
        'Posters, Flyers, Brochures',
        'Corporate Presentations',
        'Digital Ad Creatives',
        'Marketing Collateral',
        'Brand Style Guides'
      ],
      benefit: 'Stand out with professional, creative designs.'
    }
  ];

  constructor(
    private elementRef: ElementRef,
    private scrollAnimationService: ScrollAnimationService
  ) {}

  ngOnInit() {
    // Short delay to ensure DOM is ready
    setTimeout(() => {
      this.cleanup = this.scrollAnimationService.initScrollAnimation(this.elementRef);
    }, 0);
  }

  ngOnDestroy() {
    if (this.cleanup) {
      this.cleanup();
    }
  }
}
