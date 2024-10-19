import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ImageComponent } from "../image/image.component";
import { FooterComponent } from "../footer/footer.component";
import { DataService } from '../data.service';
import { DarkImageComponent } from '../dark-image/dark-image.component';

interface TEAM_MEMBER{
icon:string ,
name:string ,
role:string ,
email:string ,
linkedin:string ,
portfolio?:string ,
github?:string ,
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ImageComponent , DarkImageComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})

export class AboutComponent implements OnInit {

team:TEAM_MEMBER[] =[ {
  icon:"fas fa-user-tie ",
  name:"Ahmed Hamed",
  role:" Front end developer react | Angular",
  email:"ah1973826450@gmail.com",
  linkedin:"https://www.linkedin.com/in/ahmed-hamed-610537294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  portfolio:"https://ahmedhamed.surge.sh/",
  github:"https://github.com/AhmedHamed2002"
},{
  icon:"fas fa-laptop-code",
  name:"Ahmed Harfoush ",
  role:" Front end developer",
  email:" whitecar898@gmail.com",
  linkedin:"https://www.linkedin.com/in/ahmed-harfoush-109a29241",
  github:"https://github.com/a1harfoush"
},{
  icon:"fas fa-code",
  name:"Mohamed Abo Ali",
  role:" Front end developer",
  email:" a.z.666bnnh@gmail.com",
  linkedin:"https://www.linkedin.com/in/mohamed-abo-ali?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  portfolio:"https://66f15bcaf20b6df68e80974f--poetic-griffin-93f2e5.netlify.app/"
},{
  icon:"fas fa-headset",
  name:"Khairy Khaled",
  role:" Front end developer",
  email:" khairy.ru@gmail.com",
  linkedin:"https://www.linkedin.com/in/khairy-khaled-a8b1b3249?utm_%D9%82source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  github:"https://github.com/khairy-khaled"
},{
  icon:"fas fa-paint-brush",
  name:"Farah Dawod",
  role:" Front end developer",
  email:" farahdawod229@gmail.com",
  linkedin:"https://www.linkedin.com/in/farah-dawod",
  portfolio:"https://portfolio-dod.my.canva.site/"
},{
  icon:"fas fa-chart-pie",
  name:"Sherifa  Abo Obia ",
  role:" Front end developer",
  email:" sherifaaboobia@gmail.com",
  linkedin:"https://www.linkedin.com/in/sherifa-mahmoud-75ab152a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  portfolio:"https://portofolioofsherifa.netlify.app/"
}
]

mode!:boolean ;

constructor(private _DataService:DataService){
}

  ngOnInit(): void {
    this._DataService.darkMode.subscribe(data =>{
      this.mode =  data;
    })
  }
}
