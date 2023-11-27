import { v4 as uuidv4 } from 'uuid';
import OutputType from '../enuns/OutputType';
import Category from './Category';
import PromptRemake from './PromptRemake';
import PromptResult from './PromptResult';
import User from './User';
import UserFavorite from './UserFavorite';

class Prompt {
  constructor(id?: string) {
    this.id = id || uuidv4();
  }

  id: string;
  title: string;
  description: string;
  prompt: string;
  outputType: OutputType;
  creatorId: string;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
  creator?: User;
  category?: Category;
  PromptRemake?: PromptRemake[];
  PromptResult?: PromptResult[];
  UserFavorite?: UserFavorite[];
}

export default Prompt;
