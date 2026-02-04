import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  
  //Hay que asegurarse de que estamos en el navegador antes de intentar entrar en localStorage
  if(authService.isBrowser()){
    const isAdmin = localStorage.getItem('admin') === 'true';

    if (!isAdmin) {
      window.location.href = '/cms'; 
      return false;
    }
    
    return true;

  }else return false;
};