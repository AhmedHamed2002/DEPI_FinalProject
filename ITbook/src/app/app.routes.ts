import { Routes } from '@angular/router';
import { ShowdetailsComponent } from './showdetails/showdetails.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { BooksComponent } from './books/books.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { myguardGuard } from './myguard.guard';
import { PaymentComponent } from './payment/payment.component';

export const routes: Routes = [
  {path:'' ,redirectTo:'/login' ,pathMatch:'full'},
  {path:'login' ,component:LoginComponent},
  {path:'register' ,component:RegisterComponent},
  {path:'home' ,component:HomeComponent , canActivate:[myguardGuard]},
  {path:'about' ,component:AboutComponent , canActivate:[myguardGuard]},
  {path:'favorite' ,component:FavoriteComponent , canActivate:[myguardGuard]},
  {path:'cart' ,component:CartComponent, canActivate:[myguardGuard]},
  {path:'payment' ,component:PaymentComponent, canActivate:[myguardGuard]},
  {path:'books',component:BooksComponent , canActivate:[myguardGuard]},
  {path:'book/:id',component:ShowdetailsComponent , canActivate:[myguardGuard]},
  {path:'**' ,component:NotfoundComponent}
];
