import Budget from '@shared/infra/http/entities/Budget';
import ICreateBugetDTO from '../dtos/ICreateBudgetDTO';
import IReadBugetDTO from '../dtos/IReadBugetDTO';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';

export default interface IBudgetRepository {
  create(data: ICreateBugetDTO): Promise<Budget>;
  all(data: IReadBugetDTO): Promise<PaginatedResponse<Budget[]>>;
  find(id: string): Promise<Budget>;
}