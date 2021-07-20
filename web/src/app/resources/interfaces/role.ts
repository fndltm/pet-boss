import { Roles } from './../enums/roles';
import { User } from './user';

export interface Role {
  id: number;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  createBy: User;
  name: Roles;
}
