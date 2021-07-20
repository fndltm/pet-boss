import { Providers } from './../enums/providers';
import { Role } from "./role";

export interface User {
  id: number;
  email: string;
  password?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  active: boolean;
  roles: Role[];
  provider: Providers
}
