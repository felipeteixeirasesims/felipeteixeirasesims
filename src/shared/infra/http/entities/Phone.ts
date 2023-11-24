import { v4 as uuidv4 } from 'uuid';

class Phone {
  constructor(id?: string) {
    this.id = id || uuidv4();
  }
  
  id: string;

  phone: string;

  userId: string;
}

export default Phone;
