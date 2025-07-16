import { Component, inject } from '@angular/core';
import { Login } from '../services/login';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {

  loginService = inject(Login);
  route = inject(Router);

  signUpForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirm_password: new FormControl('', [Validators.required]),
  })

  submitSignUp(){
    if(this.signUpForm.value){
      this.loginService.userSignUp(this.signUpForm.value).subscribe({
        next: () => {
          this.route.navigate(['/sign-in']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
