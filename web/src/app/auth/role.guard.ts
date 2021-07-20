import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Roles } from '../resources/enums/roles';
import { Role } from '../resources/interfaces/role';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const data = route.data as Roles[];

    if (!route.data || (route.data && this.checkPermission(this.tokenStorageService.getRoles(), data))) {
      return true;
    }

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
      return false;
    }

    this.router.navigate(['/login']);
    return false;
  }

  checkPermission(userPermissions: Role[], requiredPermissions: Roles[]): boolean {
    return userPermissions.every(item => Object.values(requiredPermissions).includes(item.name));
  }
}
