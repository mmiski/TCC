import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Injectable()
export class AuthGuard {

  constructor( private authService : AuthService, private router : Router ) {
  }

  canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) {
    if(this.authService.afAuth.auth.currentUser != null) return true;

    this.router.navigate(['/site']);
    return false;
  }
}