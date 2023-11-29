import Logger from '@config/logger';
import IPromptRepository from '@modules/prompts/repositories/IPromptRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserFavorite from '@shared/infra/http/entities/UserFavorite';
import { inject, injectable } from 'tsyringe';
import IUserFavoritesRepository from '../repositories/IUserFavoritesRepository';

interface IRequestDTO {
  userId: string;
  promptId: string;
}

@injectable()
class CreateUserFavoritesService {
  constructor(
    @inject('UserFavoritesRepository')
    private userFavoritesRepository: IUserFavoritesRepository,
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('PromptRepository')
    private promptRepository: IPromptRepository
  ) {}

  public async execute({
    userId,
    promptId
  }: IRequestDTO): Promise<UserFavorite> {
    const userError = "User doesn't exists";
    const promptError = "Prompt doesn't exists";
    const userFavoriteError = 'User already favorited this prompt';

    const checkUserExists = await this.usersRepository.find(userId);
    const checkPromptExists = await this.promptRepository.find(promptId);
    const checkUserFavoriteExists =
      await this.userFavoritesRepository.findByPromptId(promptId);

    if (!checkUserExists) {
      Logger.error(userError);
      throw new Error(userError);
    }

    if (!checkPromptExists) {
      Logger.error(promptError);
      throw new Error(promptError);
    }

    if (checkUserFavoriteExists) {
      Logger.error(userFavoriteError);
      throw new Error(userFavoriteError);
    }

    const userFavorite = await this.userFavoritesRepository.create({
      userId,
      promptId
    });

    Logger.warn(`INSERT INTO userfavorites values ${userFavorite.promptId}}`);

    return userFavorite;
  }
}

export default CreateUserFavoritesService;
