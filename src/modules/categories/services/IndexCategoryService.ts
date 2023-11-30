import Logger from '@config/logger';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import AppError from '@shared/errors/AppError';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';
import Category from '@shared/infra/http/entities/Category';
import { inject, injectable } from 'tsyringe';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequestDTO extends IPaginationDTO {
  amount?: number;
}

@injectable()
class IndexCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  public async execute(
    data: IRequestDTO
  ): Promise<PaginatedResponse<Category[]>> {
    const codeError = 'Invalid_list';
    const messageError = "Category doesn't exist";

    const response = await this.categoryRepository.all({ ...data });
    if (response.data) {
      return response;
    }
    Logger.error(messageError);
    throw new AppError(codeError, messageError);
  }
}

export default IndexCategoryService;
