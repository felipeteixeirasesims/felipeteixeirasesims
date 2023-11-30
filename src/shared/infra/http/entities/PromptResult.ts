import { v4 as uuidv4 } from 'uuid';
import Prompt from './Prompt';

class PromptResult {
  constructor(id?: string) {
    this.id = id || uuidv4();
  }

  id: string;
  title: string;
  promptId: string;
  used_prompt: string;
  generated_output: string;
  createdAt?: Date;
  updatedAt?: Date;
  prompt?: Prompt;
}

export default PromptResult;
