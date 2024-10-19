import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, flatMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  isLogined =  new BehaviorSubject(false) ;
  isSkip =  new BehaviorSubject(false) ;
  darkMode =  new BehaviorSubject(false) ;
  delate = new BehaviorSubject(false) ;

  private cartItem = new BehaviorSubject<any[]>([]) ;
  private cartItemCount = new BehaviorSubject<number>(0) ;
  cartCount$ =  this.cartItemCount.asObservable() ;

  private FavoriteItem = new BehaviorSubject<any[]>([]) ;
  private favoriteItemCount = new BehaviorSubject<number>(0) ;
  FavoriteCount$ =  this.favoriteItemCount.asObservable() ;

  constructor(private _HttpClient:HttpClient){

    if(this.getCartItemFromStorage() != null){
      let arrayC =  this.getCartItemFromStorage() ;
      if(arrayC != null){
        this.cartItem.next(arrayC) ;
        let currentCount = this.cartItem.value.length;
        this.cartItemCount.next(currentCount)
      }
      }
    if(this.getFavoriteItemFromStorage() != null){
      let arrayF =  this.getFavoriteItemFromStorage()  ;
      if(arrayF != null){
        this.FavoriteItem.next(arrayF) ;
        let currentCount = this.FavoriteItem.value.length;
        this.favoriteItemCount.next(currentCount)
      }
      }
    if(this.getMode() != null){
      let myMode =  this.getMode()  ;
      if(myMode != null){
        this.darkMode.next(myMode) ;
      }
      }
  }

  getCartItems():any[]{
    return this.cartItem.value ;
  }

  getFavoriteItem():any[]{
    return this.FavoriteItem.value ;
  }


  addToCart(item:any){
    const findBook  =  this.cartItem.value.find((p) => p.isbn13  === item.isbn13 ) ;
    if(findBook)
    {
        findBook.quantity += 1 ;
        const priceNumber = parseFloat(findBook.price.replace(/[^0-9.-]/g, ''));
        // const quantity = parseFloat(findBook.quantity.replace(/[^0-9.-]/g, ''));
        let totalPrice =  priceNumber * findBook.quantity  ;
        totalPrice = parseFloat(totalPrice.toFixed(2)) ;
        findBook.totalPrice = totalPrice ;
    }
    else{
      const total =  item.price.replace(/[^0-9.-]/g, '');
        const add = {...item , quantity : 1 , totalPrice: total} ;
        let  newItem=  [...this.cartItem.value, add] ;
        this.cartItem.next(newItem) ;
        let currentCount = this.cartItem.value.length;
        this.cartItemCount.next(currentCount) ;
    }
    this.setCartItemToStorage(this.cartItem.value);
  }

  removeItemToCart(item:any){
    const findBook  =  this.cartItem.value.find((p) => p.isbn13  === item.isbn13 ) ;
    if(findBook)
    {
      if(findBook.quantity > 1){
        findBook.quantity -= 1 ;
        const priceNumber = parseFloat(findBook.price.replace(/[^0-9.-]/g, ''));
        // const quantity = parseFloat(findBook.quantity.replace(/[^0-9.-]/g, ''));
        let totalPrice =  priceNumber * findBook.quantity  ;
        totalPrice = parseFloat(totalPrice.toFixed(2)) ;
        findBook.totalPrice =  totalPrice ;
      }
      else this.removeFromCart(item) ;
    }
    this.setCartItemToStorage(this.cartItem.value);
  }

  removeFromCart(item:any){
  let newItem =[...this.cartItem.value, item] ;
  newItem = newItem.filter((book) => book.isbn13 !== item.isbn13) ;
  this.cartItem.next(newItem) ;
  let currentCount = this.cartItem.value.length;
  this.cartItemCount.next(currentCount) ;
  this.setCartItemToStorage(this.cartItem.value);
  }

  addToFavorite(item:any){
    const findBook  =  this.FavoriteItem.value.find((p) => p.isbn13  === item.isbn13 ) ;
    if(!findBook)
    {
      let  newItem=  [...this.FavoriteItem.value, item] ;
      this.FavoriteItem.next(newItem) ;
      let currentCount = this.FavoriteItem.value.length;
      this.favoriteItemCount.next(currentCount) ;
    }
    this.setFavoriteItemToStorage(this.FavoriteItem.value);
  }

  removeFromFavorite(item:any){
  let newItem =[...this.FavoriteItem.value, item] ;
  newItem = newItem.filter((book) => book.isbn13 !== item.isbn13) ;
  this.FavoriteItem.next(newItem) ;
  let currentCount = this.FavoriteItem.value.length;
  this.favoriteItemCount.next(currentCount) ;
  this.setFavoriteItemToStorage(this.FavoriteItem.value);
  }

  saveMode(){
    this.setMode(this.darkMode.value);
  }

  private setCartItemToStorage(cardItem:any[]){
    localStorage.setItem("cartItem",JSON.stringify(cardItem));
  }
  private getCartItemFromStorage():any[]{
    let value= localStorage.getItem("cartItem");
    return value?JSON.parse(value):[];
  }

  private setFavoriteItemToStorage(favoriteItem:any[]){
    localStorage.setItem("favoriteItem",JSON.stringify(favoriteItem));
  }
  private getFavoriteItemFromStorage():any[]{
    let value= localStorage.getItem("favoriteItem");
    return value?JSON.parse(value):[];
  }

  private setMode(mode:boolean){
    localStorage.setItem("mode",JSON.stringify(mode));
  }
  private getMode():boolean{
    let value= localStorage.getItem("mode");
    return value?JSON.parse(value):[];
  }

  getNewbooks():Observable<any>{
    let res =  this._HttpClient.get('https://api.itbook.store/1.0/new') ;
    return res ;
  }

  search(ID:string):Observable<any>{
    let res =  this._HttpClient.get(`https://api.itbook.store/1.0/search/${ID}`) ;
    return res ;
  }

  viewDetails(ID:string):Observable<any>{
    let res =  this._HttpClient.get(`https://api.itbook.store/1.0/books/${ID}`) ;
    return res ;
  }

  loginUser(data:any):Observable<any>{
    let  res  =  this._HttpClient.post('https://dummyjson.com/user/login', data) ;
    return res ;
  }
}
