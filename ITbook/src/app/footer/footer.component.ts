import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule ,RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  mode!:boolean ;

  constructor(private _DataService:DataService){
  }

  ngOnInit(): void {
    this._DataService.darkMode.subscribe(data =>{
      this.mode =  data;
    })
  }
}
