import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ScrollAnimationService } from '../services/scroll-animation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, OnDestroy {
  private cleanupAnimation: (() => void) | undefined;

  constructor(
    private elementRef: ElementRef,
    private scrollAnimationService: ScrollAnimationService
  ) {}

  ngOnInit() {
    this.cleanupAnimation = this.scrollAnimationService.initScrollAnimation(this.elementRef);
  }

  ngOnDestroy() {
    if (this.cleanupAnimation) {
      this.cleanupAnimation();
    }
  }
}
