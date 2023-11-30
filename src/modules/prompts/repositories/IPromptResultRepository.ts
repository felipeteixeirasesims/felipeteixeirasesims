import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';
import PromptResult from '@shared/infra/http/entities/PromptResult';
import ICreatePromptResultDTO from '../dtos/ICreatePromptResultDTO';
import IReadPromptResultDTO from '../dtos/IReadPromptResultDTO';

export default interface IPromptResultRepository {
  create(data: ICreatePromptResultDTO): Promise<PromptResult>;
  all(data: IReadPromptResultDTO): Promise<PaginatedResponse<PromptResult[]>>;
  find(id: string): Promise<PromptResult>;
  findByName(name: string): Promise<PromptResult>;
}
