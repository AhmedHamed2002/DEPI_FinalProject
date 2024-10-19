import { Component, ElementRef, OnInit } from '@angular/core';
import { ImageComponent } from "../image/image.component";
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { User } from '@angular/fire/auth';
import { DataService } from '../data.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImageComponent, RouterLink, CommonModule ,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  currentUser: User | null = null;
  mode!:boolean ;

  images = [
    { src: '../../../assets/images/Web.png' },
    { src: '../../../assets/images/Ai.png' },
    { src: '../../../assets/images/Cyber.png' },
    { src: '../../../assets/images/DataScience.png' },
    { src: '../../../assets/images/Flutter.png' },
    { src: '../../../assets/images/Machine.png' },
    { src: '../../../assets/images/Testing.png' }
  ];

  constructor(private _DataService:DataService , private elementRef: ElementRef , private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
    this._DataService.darkMode.subscribe(data =>{
      this.mode =  data;
    }) ;
  }

  ngAfterViewInit(): void {
    const images = this.elementRef.nativeElement.querySelectorAll('.image');
    images.forEach((image:any, i:any) => {
      image.addEventListener('click', () => {
        const isActive = image.classList.contains('only-hover');
        images.forEach((img:any) => {
          img.classList.remove('only-hover');
        });
        if (i !== 0 && !isActive) {
          image.classList.add('only-hover');
        } else if (i === 0) {
          image.closest('.gallery').classList.toggle('hidden-gallery');
        }
      });
    });
  }
}
