import { v4 as uuidv4 } from 'uuid';
import Prompt from './Prompt';

class Category {
  constructor(id?: string) {
    this.id = id || uuidv4();
  }

  id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  Prompt?: Prompt[];
}

export default Category;
