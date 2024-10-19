import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataService } from '../data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  mode!:boolean ;
  logined!:boolean  ;

  constructor(private _DataService:DataService , private authService:AuthService , private _Router:Router){
  }

  ngOnInit(): void {
    this._DataService.darkMode.subscribe((mode) =>{
      this.mode  =  mode  ;
    })
    this.authService.user$.subscribe(user => {
      this.logined = !!user;
      if(this.logined){
        this.router.navigate(['/home']);
      }
    });
  }



  fb = inject(FormBuilder);
  http = inject(HttpClient);
  auth = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loginError: string | null = null;

  onSubmit(): void {
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();
      this.loginError = null; // Reset error message
      this.auth.login(email, password).subscribe(
        () => {
          this.router.navigate(['/home']);
        },
        (error) => {

          // console.error('Login failed:', error);
          this.loginError = 'Invalid email or password. Please try again.';
          if(this.mode){
            Swal.fire({
              icon: "error",
              title: "Sorry",
              text: "Invalid email or password. Please try again.",
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
              text: "Invalid email or password. Please try again.",
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
