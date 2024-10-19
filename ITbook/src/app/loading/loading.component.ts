import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit {

  mode!:boolean ;

  constructor(private _DataService:DataService){
  }

  ngOnInit(): void {
    this._DataService.darkMode.subscribe(data =>{
      this.mode =  data;
    })
  }
}
