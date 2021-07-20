import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService<Post> {
  baseUrl = 'posts';

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'posts');
  }

  uploadFile(files: Set<File>, post: Post): Observable<Post> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(post));
    files.forEach(file => formData.append('file', file, file.name));
    return this.httpClient.post<Post>(`${environment.BASE_API_URL}/${this.baseUrl}`, formData);
  }
}
