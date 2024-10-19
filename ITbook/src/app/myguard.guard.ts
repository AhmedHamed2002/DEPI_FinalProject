import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const myguardGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService) ;
  let router = inject(Router) ;
  if(authService.isLoggedIn() ==true){
    return true ;
  }
  else{
    router.navigate(['/login']) ;
    return false ;
  }
};
