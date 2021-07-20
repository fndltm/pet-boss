import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SortDirection } from '@angular/material/sort';
import { BasePage } from '../interfaces/base-page';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends { id: number }> {
  constructor(private http: HttpClient, @Inject(String) private url: string) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${environment.BASE_API_URL}/${this.url}`);
  }

  getAllPaged(page: number, size: number, direction?: SortDirection, sort?: string): Observable<BasePage<T>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (sort) { params.set('sort', sort); }
    if (direction) { params.set('direction', direction.toUpperCase()); }
    return this.http.get<BasePage<T>>(`${environment.BASE_API_URL}/${this.url}`, { params });
  }

  search(q: string, page: number, size: number, direction?: SortDirection, sort?: string): Observable<BasePage<T>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('q', q);

    if (sort) { params.set('sort', sort); }
    if (direction) { params.set('direction', direction.toUpperCase()); }
    return this.http.get<BasePage<T>>(`${environment.BASE_API_URL}/${this.url}/search`, { params });
  }

  save(item: T): Observable<T> {
    return item.id ? this.update(item) : this.create(item);
  }

  private create(item: T): Observable<T> {
    return this.http.post<T>(`${environment.BASE_API_URL}/${this.url}`, item);
  }

  private update(item: T): Observable<T> {
    return this.http.put<T>(`${environment.BASE_API_URL}/${this.url}/${item.id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.BASE_API_URL}/${this.url}/${id}`);
  }
}
