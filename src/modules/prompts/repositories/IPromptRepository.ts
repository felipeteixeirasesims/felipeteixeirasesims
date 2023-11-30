import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';
import { default as Prompt } from '@shared/infra/http/entities/Prompt';
import ICreatePromptDTO from '../dtos/ICreatePromptDTO';
import IReadPromptDTO from '../dtos/IReadPromptDTO';

export default interface IPromptRepository {
  create(data: ICreatePromptDTO): Promise<Prompt>;
  all(data: IReadPromptDTO): Promise<PaginatedResponse<Prompt[]>>;
  find(id: string): Promise<Prompt>;
  findByName(name: string): Promise<Prompt>;
}
