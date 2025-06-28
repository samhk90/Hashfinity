import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ScrollAnimationService } from '../services/scroll-animation.service';

@Component({
  selector: 'app-howwework',
  standalone: true,
  imports: [],
  templateUrl: './howwework.component.html',
  styleUrl: './howwework.component.css'
})
export class HowweworkComponent implements OnInit, OnDestroy {
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
