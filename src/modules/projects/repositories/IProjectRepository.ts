import Project from '@shared/infra/http/entities/Project';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';
import IReadProjectDTO from '../dtos/IReadProjectDTO';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';

export default interface IProjectRepository {
  create(data: ICreateProjectDTO): Promise<Project>;
  all(data: IReadProjectDTO): Promise<PaginatedResponse<Project[]>>;
  find(id: string): Promise<Project>;
  findByName(name: string): Promise<Project>;
}