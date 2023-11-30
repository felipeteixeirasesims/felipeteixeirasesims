import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';
import PromptRemake from '@shared/infra/http/entities/PromptRemake';
import ICreatePromptRemakeDTO from '../dtos/ICreatePromptRemakeDTO';
import IReadPromptRemakeDTO from '../dtos/IReadPromptRemakeDTO';

export default interface IPromptRemakeRepository {
  create(data: ICreatePromptRemakeDTO): Promise<PromptRemake>;
  all(data: IReadPromptRemakeDTO): Promise<PaginatedResponse<PromptRemake[]>>;
  find(id: string): Promise<PromptRemake>;
  findByPromptId(name: string): Promise<PromptRemake>;
}
