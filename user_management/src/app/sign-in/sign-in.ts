import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Login } from '../services/login';
import { Router, RouterModule } from '@angular/router';
import { Message } from '../services/message';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterModule, NgClass],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  loginService = inject(Login);
  route = inject(Router);
  messageService = inject(Message);
  formBuilder = inject(FormBuilder);
  signInForm!: FormGroup;

  constructor() {
    this.signInForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  signIn() {
    if (this.signInForm.valid) {
      this.loginService.userLogin(this.signInForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.route.navigate(['/customers']);
          this.messageService.showSuccess(data.message);
        },
        error: (error) => {
          console.log(error);
          this.messageService.showError(error.message);
        },
      });
    }
  }
}
