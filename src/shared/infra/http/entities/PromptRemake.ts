import { v4 as uuidv4 } from 'uuid';
import Prompt from './Prompt';

class PromptRemake {
  constructor(id?: string) {
    this.id = id || uuidv4();
  }

  id: string;
  promptId: string;
  userId: string;
  guidance?: string;
  excerpt: string;
  createdAt?: Date;
  updatedAt?: Date;
  prompt?: Prompt;
}

export default PromptRemake;
