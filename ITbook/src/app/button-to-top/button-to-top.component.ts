import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-button-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-to-top.component.html',
  styleUrl: './button-to-top.component.css',
})
export class ButtonToTopComponent {

  isVisible = false; 
  mode!:boolean ;

  constructor(private _DataService:DataService){
  }

  ngOnInit(): void {
    this._DataService.darkMode.subscribe(data =>{
      this.mode =  data;
    })
  }

  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 300) {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  }
}
