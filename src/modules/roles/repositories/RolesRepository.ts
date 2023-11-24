import { PrismaClient, Role } from '@prisma/client';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import IReadRoleDTO from '@modules/roles/dtos/IReadRoleDTO';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';

class RolesRepository implements IRoleRepository {
  prismaClient = new PrismaClient();

  public async all({
    name,
    limit = 10,
    page = 1
  }: IReadRoleDTO): Promise<PaginatedResponse<Role[]>> {
    const paginate = {
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    };

    const data = await this.prismaClient.role.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        },
      },
      orderBy: {
        name: 'asc'
      },
      ...paginate
    });
    let itemCount;
    if (name) {
      itemCount = await this.prismaClient.role.count({
        where: {
          name: {
            contains: name,
            mode: 'insensitive'
          }
        }
      });
    } else {
      itemCount = await this.prismaClient.role.count();
    }

    const pageCount = Math.ceil(itemCount / limit);

    return { data, itemCount, pageCount };
  }
}

export default RolesRepository;
