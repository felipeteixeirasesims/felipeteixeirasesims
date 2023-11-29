import Logger from '@config/logger';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserFavoritesRepository from '../repositories/IUserFavoritesRepository';

interface IRequestDTO {
  id: string;
}

@injectable()
class DeleteUserFavoritesService {
  constructor(
    @inject('UserFavoritesRepository')
    private usersFavoritesRepository: IUserFavoritesRepository
  ) {}

  public async execute({ id }: IRequestDTO): Promise<void> {
    const codeError = 'Invalid_delete';
    const messageError = "User favorite doesn't exist";

    const userFavorite = await this.usersFavoritesRepository.findByPromptId(id);

    if (!userFavorite) {
      Logger.error(messageError);
      throw new AppError(codeError, messageError);
    }
    await this.usersFavoritesRepository.deleteByPromptId(id);
  }
}

export default DeleteUserFavoritesService;
