import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  myCartCount: number = 0;
  myFavoriteCount: number = 0;
  logined!: boolean;
  isNavbarCollapsed: boolean = true;
  toggle!:number ;  ;
  mode!:boolean ;

  constructor(private _DataService: DataService,private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.logined = !!user;
    });
    this._DataService.cartCount$.subscribe(count => {
      this.myCartCount =  count ;
    })
    this._DataService.FavoriteCount$.subscribe(count => {
      this.myFavoriteCount =  count ;
    })
    this._DataService.darkMode.subscribe(mode =>{
      this.mode =  mode ;
      if(this.mode){
        this.toggle = 1  ;
      }
      else{
        this.toggle =0  ;
      }
    })
  }

  logOut() {
    if(this.mode)
      {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-warning",
            cancelButton: "btn btn-outline-danger me-2"
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: "Are you sure?",
          text: "Are you sure you want to logout !",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "No, cancel!",
          confirmButtonText: "Yes, delete it!",
          reverseButtons: true,
          background:'#2d2b2b' ,
          iconColor:'goldenrod',
          color:'#b3b3b3' ,
        }).then((result) => {
          if (result.isConfirmed) {
            this.authService.logout().subscribe(() => {
              this.router.navigate(['/login']);
            });
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {

          }
        });
      }
      else{
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-outline-danger me-2"
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: "Are you sure?",
          text: "Are you sure you want remove to logout !",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "No, cancel!",
          confirmButtonText: "Yes, delete it!",
          reverseButtons: true,
          background:'#ffffff' ,
          iconColor:'#3f72af',
        }).then((result) => {
          if (result.isConfirmed) {
            this.authService.logout().subscribe(() => {
              this.router.navigate(['/login']);
            });
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {

          }
        });
      }

  }

  darkMode(){
    this.toggle ^= 1  ;
    this._DataService.darkMode.next(true) ;
    this._DataService.saveMode() ;
    this.mode = this._DataService.darkMode.getValue() ;
  }

  lightMode(){
    this.toggle ^= 1  ;
    this._DataService.darkMode.next(false) ;
    this._DataService.saveMode() ;
    this.mode = this._DataService.darkMode.getValue() ;
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  closeNavbar() {
    this.isNavbarCollapsed = true;
  }

  soon(){
    if(this.mode){
      Swal.fire({
        customClass: {
          confirmButton: "btn btn-warning",
        },
        buttonsStyling: false,
        title: "Soon",
        text: "This section  will be available soon.",
        icon: "question",
        background:'#2d2b2b' ,
        iconColor:'goldenrod',
        color:'#b3b3b3' ,
      });
    }
    else{
      Swal.fire({
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false ,
        title: "Soon",
        text: "This section  will be available soon.",
        icon: "question",
        background:'#ffffff' ,
        iconColor:'#3f72af',
      });
    }
  }
}
