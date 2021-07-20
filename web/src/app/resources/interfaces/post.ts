import { User } from './user';
export interface Post {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image: File;
  visualizations: number;
  author: User;
}
