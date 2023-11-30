import { PrismaClient } from '@prisma/client';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';
import UserFavorite from '@shared/infra/http/entities/UserFavorite';
import ICreateUserFavoritesDTO from '../dtos/ICreateUserFavoritesDTO';
import IReadUserFavoritesDTO from '../dtos/IReadUserFavoritesDTO';
import IUserFavoritesRepository from './IUserFavoritesRepository';

class UserFavoritesRepository implements IUserFavoritesRepository {
  prismaClient = new PrismaClient();

  public async create(data: ICreateUserFavoritesDTO): Promise<UserFavorite> {
    const userFavorite = await this.prismaClient.userFavorite.create({
      data: {
        ...data
      }
    });
    return userFavorite;
  }

  public async all({
    limit = 10,
    page = 1
  }: IReadUserFavoritesDTO): Promise<PaginatedResponse<UserFavorite[]>> {
    const paginate = {
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    };

    const data = await this.prismaClient.userFavorite.findMany({
      ...paginate
    });
    let itemCount;

    itemCount = await this.prismaClient.userFavorite.count();

    const pageCount = Math.ceil(itemCount / limit);

    return { data, itemCount, pageCount };
  }

  public async deleteByPromptId(promptId: string): Promise<void> {
    await this.prismaClient.userFavorite.delete({
      where: {
        promptId: promptId
      }
    });
  }

  public async findByPromptId(promptId: string): Promise<UserFavorite> {
    const userFavorite = await this.prismaClient.userFavorite.findUnique({
      where: {
        promptId: promptId
      }
    });
    return userFavorite;
  }
}

export default UserFavoritesRepository;
