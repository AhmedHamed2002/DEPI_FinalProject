import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterLink,  CommonModule],
templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent implements OnInit {
mode!:boolean ;

constructor(private _DataService:DataService){}

ngOnInit(): void {
  this._DataService.darkMode.subscribe(mode =>{
    this.mode = mode ;
  })
}

}
