import { v4 as uuidv4 } from 'uuid';

class Role {
  constructor(id?: string) {
    this.id = id || uuidv4();
  }
  
  id: string;

  name: string;

  description: string;
}

export default Role;
