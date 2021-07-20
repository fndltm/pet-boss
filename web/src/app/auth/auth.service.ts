import { SocialAuthService } from 'angularx-social-login';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { TokenStorageService } from './token-storage.service';
import { User } from '../resources/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean> {
    this.loggedIn.next(this.tokenStorageService.isLogged());
    return this.loggedIn.asObservable();
  }

  constructor(
    private tokenStorageService: TokenStorageService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private http: HttpClient
  ) { }

  authenticate(user: User): Observable<any> {
    if (user.email !== '') {
      return this.http.post(`${environment.BASE_API_URL}/${environment.AUTHENTICATION_URL}`, user);
    }
    return of();
  }

  login(): void {
    this.loggedIn.next(true);
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.socialAuthService.signOut();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
