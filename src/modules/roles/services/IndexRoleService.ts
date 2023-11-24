import Logger from '@config/logger';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import Role from '@shared/infra/http/entities/Role';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';

interface IRequestDTO extends IPaginationDTO {
  name?: string;
}

@injectable()
class IndexRoleService {
  constructor(
    @inject('RolesRepository')
    private repository: IRoleRepository
  ) {}

  public async execute(data: IRequestDTO): Promise<PaginatedResponse<Role[]>> {
    const codeError = "Invalid_list"
    const messageError = "Role doesn't exist";

    const response = await this.repository.all({ ...data });
    if (response.data) {
      return response;
    }
    Logger.error(messageError);
    throw new AppError(codeError, messageError);
  }
}

export default IndexRoleService;
