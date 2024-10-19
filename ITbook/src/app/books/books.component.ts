import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule ,FormsModule , RouterLink ,NgTemplateOutlet , LoadingComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{
  books: any[] = [];
  mybook: any[] = [];
  myFavorite: any[] = [];
  dataForm: string = "";
  mode!:boolean ;
  logined!:boolean ;
  categories: string[] = [
    "Web Development",
    "Artificial Intelligence",
    "Data Science",
    "Software Engineering",
    "Cybersecurity",
    "Robotics",
    "Software testing",
    "Machine learning",
    "Flutter"
  ];
  searchForm: FormGroup;
  constructor(private _DataService: DataService,private authService: AuthService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: [''],
      category: ['All']
    });
  }



  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.logined = !!user;
    });
    this._DataService.getNewbooks().subscribe((data) => {
      this.books = data.books;
    });
    this._DataService.darkMode.subscribe(data =>{
      this.mode =  data;
    })
    this.myFavorite = this._DataService.getFavoriteItem();
  }

  search(data: string) {
    if (data.length >= 2) {
      this._DataService.search(this.dataForm).subscribe(data => {
        this.mybook = data.books;
      });
    }
  }

  searchByCategory(category: string) {
    const searchTerm = category.replace(/\s+/g, ',');
    this.dataForm = searchTerm;
    this.search(searchTerm);
  }

  find(book: any): boolean {
    let f = this.myFavorite.find((i) => i.isbn13 == book.isbn13);
    return !!f;
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

  addBookToFavorite(book: any) {
    this._DataService.addToFavorite(book);
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

  removeBookToFavorite(book: any) {
    this._DataService.removeFromFavorite(book);
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

  updateItems() {
    this.myFavorite = this._DataService.getFavoriteItem();
  }

}
