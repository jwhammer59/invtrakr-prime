import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/models/User';

import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/stores']);
      }
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  getEmailErrorMessage() {
    return this.f['email'].hasError('required')
      ? 'You must enter a value'
      : this.f['email'].hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    return this.f['password'].hasError('required')
      ? 'You must enter a value'
      : this.f['password'].hasError('minlength')
      ? 'Password must be at least 6 characters'
      : '';
  }

  onSubmit({ value, valid }: { value: User; valid: boolean }) {
    this.authService
      .login(this.f['email'].value, this.f['password'].value)
      .then((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: 'Congratulations you are logged in!',
          life: 3000,
        });
        this.router.navigate(['/stores']);
      })
      .catch((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Form Is Invalid',
          detail: 'Check form for errors!',
          life: 3000,
        });
      });
  }
}
