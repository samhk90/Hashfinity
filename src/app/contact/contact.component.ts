import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollAnimationService } from '../services/scroll-animation.service';
import { GoogleSheetsService, ContactFormData } from '../services/google-sheets.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
  submitted = false;
  submitting = false;
  error = false;
  formData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  private cleanup: (() => void) | undefined;

  constructor(
    private elementRef: ElementRef,
    private scrollAnimationService: ScrollAnimationService,
    private googleSheetsService: GoogleSheetsService
  ) {}

  ngOnInit() {
    this.cleanup = this.scrollAnimationService.initScrollAnimation(this.elementRef);
  }

  ngOnDestroy() {
    if (this.cleanup) {
      this.cleanup();
    }
  }

  onSubmit(): void {
    this.submitting = true;
    this.error = false;
    
    this.googleSheetsService.submitForm(this.formData).subscribe({
      next: () => {
        this.submitted = true;
        this.submitting = false;
        
        // Reset form after successful submission

      },
      error: (error) => {
        setTimeout(() => {
          this.submitted = false;
          this.formData = {
            name: '',
            email: '',
            phone: '',
            message: ''
          };
        }, 3000);
        this.submitting= false;
      }
    });
  }
}
