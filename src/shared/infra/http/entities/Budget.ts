import { v4 as uuidv4 } from 'uuid';
import Project from './Project';

class Budget {
  constructor(id?: string) {
    this.id = id || uuidv4();
  }

  id: string;

  amount: number;

  projectId: string;

  project?: Project;

}

export default Budget;
