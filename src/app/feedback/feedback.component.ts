import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {

 feedbackForm: FormGroup;
  rating = 0;

  constructor(private fb: FormBuilder) {
    this.feedbackForm = this.fb.group({
      name: [''],
      email: [''],
      comment: [''],
      rating: [0]
    });
  }

  setRating(star: number) {
    this.rating = star;
    this.feedbackForm.patchValue({ rating: star });
  }

  submitForm() {
    console.log("Feedback Submitted:", this.feedbackForm.value);
    alert("Thanks for your feedback!");
    this.feedbackForm.reset();
    this.rating = 0;
  }
}
