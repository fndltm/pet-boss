import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {
  baseUrl = 'users';

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'users');
  }

  createSocialuser(user: User): Observable<any> {
    return this.httpClient.post<User>(`${environment.BASE_API_URL}/${this.baseUrl}/social`, user);
  }

  isValidEmail(id: number, email: string): Observable<boolean> {
    const url = (id || id !== undefined) ? `/${id}` : '';
    const params = new HttpParams()
      .set('email', email);
    return this.httpClient.get<boolean>(`${environment.BASE_API_URL}/${this.baseUrl}/validate${url}`, { params });
  }
}
