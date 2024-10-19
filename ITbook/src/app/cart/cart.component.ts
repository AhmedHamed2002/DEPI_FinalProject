import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  myCartItems:any[] =[] ;
  mode!:boolean ;
  Total:number =0  ;

  constructor(private _DataService:DataService){
  }
  ngOnInit(): void {
    this.myCartItems = this._DataService.getCartItems();

    this.myCartItems.map((i) =>{
      this.Total +=parseFloat(i.totalPrice) ;
      this.Total = parseFloat(this.Total.toFixed(2)) ;
    })

    this._DataService.darkMode.subscribe((mode) =>{
      this.mode  =  mode  ;
    })
  }

  addBookToCart(book: any) {
    this._DataService.addToCart(book);
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

  removeItemBookToCart(book: any) {
    this._DataService.removeItemToCart(book) ;
    this.updateItems() ;
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


  removeBookToCart(book:any){

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
        text: "Are you sure you want remove from cart!",
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
          this._DataService.removeFromCart(book) ;
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
          this._DataService.removeFromCart(book) ;
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

  updateItems() {
    this.myCartItems = this._DataService.getCartItems();
    this.Total =0 ;
    this.myCartItems.map((i) =>{
      this.Total += parseFloat(i.totalPrice) ;
      this.Total = parseFloat(this.Total.toFixed(2)) ;
    })
  }
}
