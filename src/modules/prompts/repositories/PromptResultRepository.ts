import { PrismaClient } from '@prisma/client';

import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';
import PromptResult from '@shared/infra/http/entities/PromptResult';
import ICreatePromptResultDTO from '../dtos/ICreatePromptResultDTO';
import IReadPromptResultDTO from '../dtos/IReadPromptResultDTO';
import IPromptResultRepository from './IPromptResultRepository';

class PromptResultRepository implements IPromptResultRepository {
  prismaClient = new PrismaClient();

  public async create(data: ICreatePromptResultDTO): Promise<PromptResult> {
    const promptResult = await this.prismaClient.promptResult.create({
      data: {
        ...data
      }
    });
    return promptResult;
  }

  public async all({
    title,
    limit = 10,
    page = 1
  }: IReadPromptResultDTO): Promise<PaginatedResponse<PromptResult[]>> {
    const paginate = {
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    };

    const data = await this.prismaClient.promptResult.findMany({
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
      itemCount = await this.prismaClient.promptResult.count({
        where: {
          title: {
            contains: title,
            mode: 'insensitive'
          }
        }
      });
    } else {
      itemCount = await this.prismaClient.promptResult.count();
    }

    const pageCount = Math.ceil(itemCount / limit);

    return { data, itemCount, pageCount };
  }

  public async find(id: string): Promise<PromptResult> {
    const promptResult = await this.prismaClient.promptResult.findFirst({
      where: {
        id
      }
    });
    return promptResult;
  }

  public async findByName(title: string): Promise<PromptResult> {
    const promptResult = await this.prismaClient.promptResult.findFirst({
      where: {
        title
      }
    });
    return promptResult;
  }

  public async findByPromptId(promptId: string): Promise<PromptResult> {
    const promptRemake = await this.prismaClient.promptResult.findFirst({
      where: {
        promptId
      }
    });
    return promptRemake;
  }
}

export default PromptResultRepository;
