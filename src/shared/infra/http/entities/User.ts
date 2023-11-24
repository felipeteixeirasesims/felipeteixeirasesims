import { v4 as uuidv4 } from 'uuid';
import Role from './Role';
import Session from './Session';
import Phone from './Phone';

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
  
  createdAt?: Date;

  updatedAt?: Date;

  supervisorId?: string;

  supervisor?: User;

  supervised?: User[];
  
  roleId: string;

  role?: Role;

  sessions?: Session[];
  
}

export default User;
