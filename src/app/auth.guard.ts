import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  //console.log("route", route)
  //console.log('state', state)

  // console.log('Route guard', state.url);

  const router:Router = inject(Router)
  
  //get token
  const jwt = localStorage.getItem('itcast-jwt')

  if(jwt){
    return true
  }
  //jump to login page
  router.navigate(['/login'])
  return false;
};
