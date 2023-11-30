import { PrismaClient } from '@prisma/client';

import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';
import PromptRemake from '@shared/infra/http/entities/PromptRemake';
import ICreatePromptRemakeDTO from '../dtos/ICreatePromptRemakeDTO';
import IReadPromptRemakeDTO from '../dtos/IReadPromptRemakeDTO';
import IPromptRemakeRepository from './IPromptRemakeRepository';

class PromptRemakeRepository implements IPromptRemakeRepository {
  prismaClient = new PrismaClient();

  public async create(data: ICreatePromptRemakeDTO): Promise<PromptRemake> {
    const prompt = await this.prismaClient.promptRemake.create({
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
  }: IReadPromptRemakeDTO): Promise<PaginatedResponse<PromptRemake[]>> {
    const paginate = {
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    };

    const data = await this.prismaClient.promptRemake.findMany({
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

  public async find(id: string): Promise<PromptRemake> {
    const promptRemake = await this.prismaClient.promptRemake.findFirst({
      where: {
        id
      }
    });
    return promptRemake;
  }

  public async findByPromptId(promptId: string): Promise<PromptRemake> {
    const promptRemake = await this.prismaClient.promptRemake.findFirst({
      where: {
        promptId
      }
    });
    return promptRemake;
  }
}

export default PromptRemakeRepository;
