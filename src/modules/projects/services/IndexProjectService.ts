import Logger from '@config/logger';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Project from '@shared/infra/http/entities/Project';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';
import IProjectRepository from '../repositories/IProjectRepository';

interface IRequestDTO extends IPaginationDTO {
  name?: string;
}

@injectable()
class IndexProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectRepository: IProjectRepository
  ) {}

  public async execute(data: IRequestDTO): Promise<PaginatedResponse<Project[]>> {
    const codeError = "Invalid_list"
    const messageError = "Project doesn't exist";

    const response = await this.projectRepository.all({ ...data });
    if (response.data) {
      return response;
    }
    Logger.error(messageError);
    throw new AppError(codeError, messageError);
  }
}

export default IndexProjectService;
