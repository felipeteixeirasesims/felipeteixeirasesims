import { v4 as uuidv4 } from 'uuid';
import Budget from './Budget';
import ReadinessLevel from '../enuns/ReadinessLevel';

class Project {
  constructor(id?: string) {
    this.id = id || uuidv4();
  }

  id: string;

  name: string;

  description: string;

  readinessLevel: ReadinessLevel;

  budgets?: Budget[];
}

export default Project;
