import Logger from '@config/logger';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import AppError from '@shared/errors/AppError';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';
import UserFavorite from '@shared/infra/http/entities/UserFavorite';
import { inject, injectable } from 'tsyringe';
import IUserFavoritesRepository from '../repositories/IUserFavoritesRepository';

interface IRequestDTO extends IPaginationDTO {
  amount?: number;
}

@injectable()
class IndexCategoryService {
  constructor(
    @inject('UserFavoritesRepository')
    private userFavoritesRepository: IUserFavoritesRepository
  ) {}

  public async execute(
    data: IRequestDTO
  ): Promise<PaginatedResponse<UserFavorite[]>> {
    const codeError = 'Invalid_list';
    const messageError = "Category doesn't exist";

    const response = await this.userFavoritesRepository.all({ ...data });
    if (response.data) {
      return response;
    }
    Logger.error(messageError);
    throw new AppError(codeError, messageError);
  }
}

export default IndexCategoryService;
