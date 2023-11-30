import { v4 as uuidv4 } from 'uuid';
import InputType from '../enuns/InputType';
import InputAlternative from './InputAlternative';

class Input {
  constructor(id?: string) {
    this.id = id || uuidv4();
  }

  id: string;
  title: string;
  type: InputType;
  value?: string;
  order: number;
  required: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  InputAlternative: InputAlternative[];
}

export default Input;
