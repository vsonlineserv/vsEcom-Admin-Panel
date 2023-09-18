import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Global } from 'src/app/global';
import { GlobalService } from './global.service';
;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private globalService: GlobalService, private router: Router, private global: Global) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    var tokenExists = this.globalService.checkTokenExist();
    var isAuthenticated = this.globalService.checkTokenValid();
    var isFlagVerified = this.globalService.checkIsAuthenticated();
    if (!tokenExists || !isFlagVerified || !isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true
  }

}
