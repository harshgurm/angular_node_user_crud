import { Component, inject } from '@angular/core';
import { Login } from '../services/login';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordStrengthValidator, passwordsMatchValidator } from '../custom-password-validation';
import { Message } from '../services/message';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {

  loginService = inject(Login);
  route = inject(Router);
  formBuilder = inject(FormBuilder);
  messageService = inject(Message);

  signUpForm!: FormGroup;
  
  constructor() {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), passwordStrengthValidator()]],
      confirm_password: ['', [Validators.required]],
    }, { validators: passwordsMatchValidator });
  }

  submitSignUp(){
    if(this.signUpForm?.valid) {
      this.loginService.userSignUp(this.signUpForm.value).subscribe({
        next: (result) => {
          this.route.navigate(['/sign-in']);
          this.messageService.showSuccess(result.message);
        },
        error: (error) => {
          console.log(error);
          this.messageService.showError(error.message);
        },
      });
    }
  }
}
