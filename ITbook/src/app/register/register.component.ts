import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataService } from '../data.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  mode!:boolean ;

  constructor(private _DataService:DataService , private _Router:Router){

  }

  ngOnInit(): void {
    this._DataService.darkMode.subscribe((mode) =>{
      this.mode  =  mode  ;
    })
  }


  fb = inject(FormBuilder);
  http = inject(HttpClient);
  auth = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !passwordValid ? { passwordStrength: true } : null;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const rawForm = this.form.getRawValue();
      this.auth.register(rawForm.email, rawForm.username, rawForm.password)
        .subscribe(
          () => {
            this.router.navigate(['/home']);
          },
          (error) => {
            // console.error('Registration failed:', error);
            if(this.mode){
              Swal.fire({
                icon: "error",
                title: "Sorry",
                text: "email already in use",
                background:'#2d2b2b' ,
                iconColor:'goldenrod',
                color:'#b3b3b3' ,
                customClass: {
                  confirmButton: "btn btn-warning",
                },
              });
            }
            else{
              Swal.fire({
                icon: "error",
                title: "Sorry",
                text: "email already in use",
                background:'#ffffff' ,
                iconColor:'#3f72af',
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              });
            }
          }
        );
    }
  }
}
