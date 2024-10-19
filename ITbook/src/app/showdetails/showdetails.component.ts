import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-showdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showdetails.component.html',
  styleUrl: './showdetails.component.css'
})
export class ShowdetailsComponent implements OnInit {

  details: any;
  Isbn13: any;
  myFavorite: any[] = [];
  mode!:boolean ;
  logined!:boolean ;

  constructor(private _DataService: DataService,private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.logined = !!user;
    });
    this.Isbn13 = this.route.snapshot.params['id'];
    this._DataService.viewDetails(this.Isbn13).subscribe(data => {
      this.details = data;
    });
    this._DataService.darkMode.subscribe(data =>{
      this.mode =  data;
    });
    this.myFavorite = this._DataService.getFavoriteItem();
  }

  isFavorite(book: any): boolean {
    return this.myFavorite.some(item => item.isbn13 === book.isbn13);
  }

  toggleFavorite(book: any) {
    if (this.isFavorite(book)) {
      this._DataService.removeFromFavorite(book);
    } else {
      this._DataService.addToFavorite(book);
    }
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

  addBookToCart(book: any) {
    this._DataService.addToCart(book);
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

  updateItems() {
    this.myFavorite = this._DataService.getFavoriteItem();
  }
}
