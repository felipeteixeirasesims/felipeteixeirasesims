import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';
import UserFavorite from '@shared/infra/http/entities/UserFavorite';
import ICreateUserFavoritesDTO from '../dtos/ICreateUserFavoritesDTO';
import IReadUserFavoritesDTO from '../dtos/IReadUserFavoritesDTO';

export default interface IUserFavoritesRepository {
  create(data: ICreateUserFavoritesDTO): Promise<UserFavorite>;
  all(data: IReadUserFavoritesDTO): Promise<PaginatedResponse<UserFavorite[]>>;
  deleteByPromptId(promptId: string): Promise<void>;
  findByPromptId(promptId: string): Promise<UserFavorite>;
}
