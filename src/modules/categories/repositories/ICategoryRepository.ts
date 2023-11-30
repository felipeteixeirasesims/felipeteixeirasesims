import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';
import Category from '@shared/infra/http/entities/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import IReadCategoryDTO from '../dtos/IReadCategoryDTO';

export default interface ICategoryRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  all(data: IReadCategoryDTO): Promise<PaginatedResponse<Category[]>>;
  find(id: string): Promise<Category>;
}
