import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../services/login';
import { Router } from '@angular/router';
import { Message } from '../services/message';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignIn {

    signInForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
  })

  loginService = inject(Login);
  route = inject(Router);
  messageService = inject(Message);

  signIn(){
    if(this.signInForm.valid){
      this.loginService.userLogin(this.signInForm.value).subscribe({
        next: () => {
          this.route.navigate(['/customers']);
          this.messageService.showSuccess('Login successful');
        },
        error: (error) => {
          this.messageService.showError(error);
        },
      });
    }
  }

}
