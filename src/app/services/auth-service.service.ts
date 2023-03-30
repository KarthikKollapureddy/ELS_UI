import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MainserviceService } from './mainservice.service';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private ms:MainserviceService,private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.ms.isLoggedIn()) {
      return true;
    }else{
     this.router.navigate(['/login'])
      return false;}
      
  }
}
