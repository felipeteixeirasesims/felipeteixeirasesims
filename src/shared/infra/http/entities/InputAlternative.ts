import { v4 as uuidv4 } from 'uuid';

class Input {
  constructor(id?: string) {
    this.id = id || uuidv4();
  }

  id: string;
  inputId: string;
  description: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default Input;
