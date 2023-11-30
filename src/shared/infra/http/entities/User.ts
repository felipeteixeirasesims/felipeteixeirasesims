import { v4 as uuidv4 } from 'uuid';
import Phone from './Phone';
import Prompt from './Prompt';
import Role from './Role';
import Session from './Session';
import UserFavorite from './UserFavorite';

class User {
  constructor(id?: string) {
    this.id = id || uuidv4();
  }

  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  phones: Phone[];
  school?: string;
  grade?: string;
  country?: string;
  state?: string;
  city?: string;
  createdAt?: Date;
  updatedAt?: Date;
  roleId: string;
  role?: Role;
  sessions?: Session[];
  Prompt: Prompt[];
  UserFavorite: UserFavorite[];
}

export default User;
