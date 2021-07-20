import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Role } from '../interfaces/role';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService extends BaseService<Role> {
  baseUrl = 'roles';

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'roles');
  }
}
