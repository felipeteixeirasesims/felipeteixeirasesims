import Logger from '@config/logger';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import AppError from '@shared/errors/AppError';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';
import Prompt from '@shared/infra/http/entities/Prompt';
import { inject, injectable } from 'tsyringe';
import IPromptRepository from '../repositories/IPromptRepository';

interface IRequestDTO extends IPaginationDTO {
  name?: string;
}

@injectable()
class IndexPromptService {
  constructor(
    @inject('PromptRepository')
    private projectRepository: IPromptRepository
  ) {}

  public async execute(
    data: IRequestDTO
  ): Promise<PaginatedResponse<Prompt[]>> {
    const codeError = 'Invalid_list';
    const messageError = "Project doesn't exist";

    const response = await this.projectRepository.all({ ...data });
    if (response.data) {
      return response;
    }
    Logger.error(messageError);
    throw new AppError(codeError, messageError);
  }
}

export default IndexPromptService;
