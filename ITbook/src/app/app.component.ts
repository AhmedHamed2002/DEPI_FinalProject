import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonToTopComponent } from './button-to-top/button-to-top.component';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ButtonToTopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' ,
})

export class AppComponent{
  title = 'DEPI_finalProject';
}
