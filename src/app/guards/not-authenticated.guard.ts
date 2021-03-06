import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './../services/authentication.service';


@Injectable()
export class NotAuthenticatedGuard implements CanActivate {

  constructor(
    private authenticationService:AuthenticationService,
    private router: Router) {};

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!localStorage.getItem('token')) {
        return true;
      } else {
        this.router.navigate(["/restricted"]);
        return false;
      }
  }
}
