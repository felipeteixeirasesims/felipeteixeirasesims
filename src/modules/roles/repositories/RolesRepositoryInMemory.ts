import IReadRoleDTO from '@modules/roles/dtos/IReadRoleDTO';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';
import Role from '@shared/infra/http/entities/Role';

class RolesRepositoryInMemory implements IRoleRepository {

  roles: Role[] = [];

  async all(data: IReadRoleDTO): Promise<PaginatedResponse<Role[]>> {
    let { roles } = this;
    let itemCount = this.roles.length;

    if (data?.name) {
      roles = this.roles.filter(role => role.name.startsWith(data.name));
      itemCount = roles.length;
    }

    if (data?.page && data.limit) {
      roles = this.roles.slice(
        (data.page - 1) * data.limit,
        (data.page - 1) * data.limit + data.limit
      );
    }

    return {
      data: roles.sort((u1, u2) => u1.name.localeCompare(u2.name)),
      itemCount,
      pageCount: Math.ceil(roles.length / (data?.limit || 10))
    };
  }
}

export default RolesRepositoryInMemory;
