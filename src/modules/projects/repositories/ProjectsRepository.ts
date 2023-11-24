import { PrismaClient } from '@prisma/client';
import IProjectRepository from './IProjectRepository';
import Project from '@shared/infra/http/entities/Project';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

import IReadProjectDTO from '@modules/projects/dtos/IReadProjectDTO';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';


class ProjectsRepository implements IProjectRepository {
 
  prismaClient = new PrismaClient();

  public async create(data: ICreateProjectDTO): Promise<Project> {
  
    const project = await this.prismaClient.project.create({
      data: {
        ...data,
        users: {
          create: data?.users?.map((user) => ({
            user: { connect: { id: user.id } },
            hoursAllocated: user.hoursAllocated
          }))
        }
      },
      include: {
        users: {
          include: {
            user: true
          }
        }
      }
    });
    return project;
  }

  public async all({
    name,
    limit = 10,
    page = 1
  }: IReadProjectDTO): Promise<PaginatedResponse<Project[]>> {
    const paginate = {
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    };

    const data = await this.prismaClient.project.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        },
      },
      orderBy: {
        name: 'asc'
      },
      include: {
        users: true
      },
      ...paginate
    });
    let itemCount;
    if (name) {
      itemCount = await this.prismaClient.project.count({
        where: {
          name: {
            contains: name,
            mode: 'insensitive'
          }
        }
      });
    } else {
      itemCount = await this.prismaClient.project.count();
    }

    const pageCount = Math.ceil(itemCount / limit);

    return { data, itemCount, pageCount };
  }
  
  public async find(id: string): Promise<Project> {
    const project = await this.prismaClient.project.findFirst({
      where: {
        id
      }
    });
    return project;
  }

  public async findByName(name: string): Promise<Project> {
    const project = await this.prismaClient.project.findFirst({
      where: {
        name
      }
    });
    return project;
  }
}

export default ProjectsRepository;
