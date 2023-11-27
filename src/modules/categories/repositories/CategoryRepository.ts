import { PrismaClient } from '@prisma/client';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';
import Category from '@shared/infra/http/entities/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import IReadCategoryDTO from '../dtos/IReadCategoryDTO';
import ICategoryRepository from './ICategoryRepository';

class CategoryRepository implements ICategoryRepository {
  prismaClient = new PrismaClient();

  public async create(data: ICreateCategoryDTO): Promise<Category> {
    const category = await this.prismaClient.category.create({
      data: {
        ...data
      }
    });
    return category;
  }

  public async all({
    limit = 10,
    page = 1
  }: IReadCategoryDTO): Promise<PaginatedResponse<Category[]>> {
    const paginate = {
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    };

    const data = await this.prismaClient.category.findMany({
      orderBy: {
        name: 'asc'
      },
      ...paginate
    });
    let itemCount;

    itemCount = await this.prismaClient.category.count();

    const pageCount = Math.ceil(itemCount / limit);

    return { data, itemCount, pageCount };
  }

  public async find(id: string): Promise<Category> {
    const category = await this.prismaClient.category.findFirst({
      where: {
        id
      }
    });
    return category;
  }
}

export default CategoryRepository;
