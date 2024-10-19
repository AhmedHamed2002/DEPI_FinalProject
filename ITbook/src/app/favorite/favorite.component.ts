import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit {

  myFavoriteItems:any[] =[] ;
  mode!:boolean ;
  logined!:boolean ;
  delete!:boolean ;

  constructor(private _DataService:DataService ,private authService: AuthService){
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.logined = !!user;
    });
    this._DataService.delate.subscribe(y=>{
      this.delete = y ;
    })
    this.myFavoriteItems = this._DataService.getFavoriteItem() ;
    this._DataService.darkMode.subscribe(data =>{
      this.mode =  data;
    })
  }

  addBookToCart(book:any){
    this._DataService.addToCart(book) ;
    this.updateItems();
    if(this.mode){
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Done ;)",
        background:'#2d2b2b' ,
        color:'goldenrod' ,
      });
    }
    else{
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Done ;)",
        background:'#ffffff' ,
        color:'#3f72af'
      });
    }
  }
  removeBookToFavorite(book:any){
    if(this.delete){
      this._DataService.removeFromFavorite(book) ;
      this._DataService.delate.next(true) ;
      this.updateItems();
    }
    else{
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
          text: "Are you sure you want remove from favourites!",
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
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your book has been deleted.",
              icon: "success" ,
              background:'#2d2b2b' ,
              iconColor:'goldenrod',
              color:'#b3b3b3' ,
            });
            this._DataService.removeFromFavorite(book) ;
            this._DataService.delate.next(true) ;
            this.updateItems();
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your book is safe :)",
              icon: "error",
              background:'#2d2b2b' ,
              iconColor:'goldenrod',
              color:'#b3b3b3' ,
            });
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
          text: "Are you sure you want remove from favourites!",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "No, cancel!",
          confirmButtonText: "Yes, delete it!",
          reverseButtons: true,
          background:'#ffffff' ,
          iconColor:'#3f72af',
        }).then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your book has been deleted.",
              icon: "success" ,
              background:'#ffffff' ,
              iconColor:'#3f72af',
            });
            this._DataService.removeFromFavorite(book) ;
            this._DataService.delate.next(true) ;
            this.updateItems();
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your book is safe :)",
              icon: "error",
              background:'#ffffff' ,
              iconColor:'#3f72af',
            });
          }
        });
      }
    }
  }

  updateItems() {
    this.myFavoriteItems = this._DataService.getFavoriteItem();
    this.delete = this._DataService.delate.getValue();
  }
}
