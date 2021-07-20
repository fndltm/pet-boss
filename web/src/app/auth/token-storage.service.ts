import { Role } from './../resources/interfaces/role';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Roles } from '../resources/enums/roles';

export const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.localStorage.removeItem(TOKEN_KEY);
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isTokenExpired(token?: string | null): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = new JwtHelperService().getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date?.valueOf()! > new Date().valueOf());
  }

  public isLogged(): boolean {
    return !this.isTokenExpired();
  }

  public getUserId(): number {
    return this.decodeToken().scopes.id;
  }

  public getUsername(): string {
    return this.decodeToken()?.scopes?.name;
  }

  public isADMIN(): boolean {
    return this.getRoles()?.find(item => item.name === Roles.ADMIN) != null;
  }

  public getRoles(): Role[] {
    return this.decodeToken()?.roles as Role[];
  }

  public getUserEmail(): string {
    return this.decodeToken()?.scopes?.email;
  }

  public decodeToken(): any {
    const decoded = new JwtHelperService().decodeToken(this.getToken()!);
    if (decoded === undefined) { return null; }
    return decoded;
  }

}
