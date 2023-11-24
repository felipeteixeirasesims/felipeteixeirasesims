import { PrismaClient } from '@prisma/client';
import User from '@shared/infra/http/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IReadUserDTO from '@modules/users/dtos/IReadUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';

class UserRepository implements IUserRepository {
  prismaClient = new PrismaClient();

  public async create(data: ICreateUserDTO): Promise<User> {
  
    const transaction = await this.prismaClient.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          ...data,
          phones: {
            create: data.phones.map((phone) => ({
              phone
            })),
          },
        },
        include: {
          phones: true,
        },
      });
  
      return user;
    });
    return transaction;
  }

  public async all({
    firstName,
    limit = 10,
    page = 1
  }: IReadUserDTO): Promise<PaginatedResponse<User[]>> {
    const paginate = {
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    };

    const data = await this.prismaClient.user.findMany({
      where: {
        firstName: {
          contains: firstName,
          mode: 'insensitive'
        },
      },
      orderBy: {
        firstName: 'asc'
      },
      include: {
        role: true,
        phones: true
       
      },
      ...paginate
    });
    let itemCount;
    if (firstName) {
      itemCount = await this.prismaClient.user.count({
        where: {
          firstName: {
            contains: firstName,
            mode: 'insensitive'
          }
        }
      });
    } else {
      itemCount = await this.prismaClient.user.count();
    }

    const pageCount = Math.ceil(itemCount / limit);

    return { data, itemCount, pageCount };
  }

  public async find(id: string): Promise<User> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        id
      },
      include: {
        phones: true,
        sessions: true,
        role: true
      }
    });
    return user;
  }

  public async findByFirstName(firstName: string): Promise<User> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        firstName
      },
      include: {
        phones: true
      }
    });
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        email
      },
      include: {
        phones: true
      }
    });
    return user;
  }

  public async update(data: IUpdateUserDTO): Promise<User> {
    const existingPhoneIds = await this.prismaClient.phone.findMany({
      where: {
        userId: data.id,
      },
      select: {
        id: true,
      },
    });
  
    const user = await this.prismaClient.user.update({
      data: {
        ...data,
        phones: {
          deleteMany: existingPhoneIds.map(phone => ({ id: phone.id })),
          create: data.phones.map(phone => ({
            phone
          })),
        },
      },
      where: {
        id: data.id,
      },
      include: {
        phones: true,
      },
    });
  
    return user;
  }
  
  

  public async delete(id: string): Promise<void> {
    await this.prismaClient.user.delete({
      where: {
        id
      }
    });
  }
}

export default UserRepository;
