import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  comments: any[] = [];
  constructor() { }

  commentForm = new FormGroup({
    'nick': new FormControl(null, Validators.required),
    'title': new FormControl(null, Validators.required),
    'review': new FormControl(null, [Validators.required, Validators.minLength(50), Validators.maxLength(500)]),
    'dateOfPurchase': new FormControl()
  });

  onSubmit() {
    if (this.commentForm.valid) {
      const comment = {
        nick: this.commentForm.value.nick,
        title: this.commentForm.value.title,
        review: this.commentForm.value.review,
        dateOfPurchase: this.commentForm.value.dateOfPurchase || ''
      };
      this.comments.push(comment);
      console.log(this.comments);
      this.commentForm.reset();
    }
  }
}
