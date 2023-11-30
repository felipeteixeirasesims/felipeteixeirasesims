import { PrismaClient } from '@prisma/client';
import IPromptRepository from './IPromptRepository';

import IReadProjectDTO from '@modules/prompts/dtos/IReadPromptDTO';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';
import Prompt from '@shared/infra/http/entities/Prompt';
import ICreatePromptDTO from '../dtos/ICreatePromptDTO';

class PromptRepository implements IPromptRepository {
  prismaClient = new PrismaClient();

  public async create(data: ICreatePromptDTO): Promise<Prompt> {
    const prompt = await this.prismaClient.prompt.create({
      data: {
        ...data
      }
    });
    return prompt;
  }

  public async all({
    title,
    limit = 10,
    page = 1
  }: IReadProjectDTO): Promise<PaginatedResponse<Prompt[]>> {
    const paginate = {
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    };

    const data = await this.prismaClient.prompt.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive'
        }
      },
      orderBy: {
        title: 'asc'
      },
      ...paginate
    });
    let itemCount;
    if (title) {
      itemCount = await this.prismaClient.prompt.count({
        where: {
          title: {
            contains: title,
            mode: 'insensitive'
          }
        }
      });
    } else {
      itemCount = await this.prismaClient.prompt.count();
    }

    const pageCount = Math.ceil(itemCount / limit);

    return { data, itemCount, pageCount };
  }

  public async find(id: string): Promise<Prompt> {
    const project = await this.prismaClient.prompt.findFirst({
      where: {
        id
      }
    });
    return project;
  }

  public async findByName(title: string): Promise<Prompt> {
    const project = await this.prismaClient.prompt.findFirst({
      where: {
        title
      }
    });
    return project;
  }
}

export default PromptRepository;
