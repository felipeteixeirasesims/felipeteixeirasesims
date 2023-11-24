import { v4 as uuidv4 } from 'uuid';
import User from './User';

class Session {
  constructor(id?: string) {
    this.id = id || uuidv4();
  }

  id: string;

  expiresDate: Date;

  refreshToken: string;

  createdAt?: Date;

  updatedAt?: Date;

  userId: string;

  user?: User;
}

export default Session;
