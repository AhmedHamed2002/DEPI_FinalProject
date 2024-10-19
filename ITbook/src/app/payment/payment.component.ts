import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent  implements OnInit{
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
}
