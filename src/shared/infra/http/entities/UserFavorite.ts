import { v4 as uuidv4 } from 'uuid';

class UserFavorite {
  constructor(id?: string) {
    this.id = id || uuidv4();
  }

  id: string;
  userId: string;
  promptId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default UserFavorite;
