import Logger from '@config/logger';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@shared/infra/http/entities/User';
import IOrdinationDTO from '@shared/dtos/IOrdinationDTO';

interface IRequestDTO extends IPaginationDTO, IOrdinationDTO {
  firstName?: string;
}

@injectable()
class IndexUserService {
  constructor(
    @inject('UsersRepository')
    private repository: IUserRepository
  ) {}

  public async execute(data: IRequestDTO): Promise<PaginatedResponse<User[]>> {
    const codeError = "Invalid_list"
    const messageError = "User doesn't exist";

    const response = await this.repository.all({ ...data });
    if (response.data) {
      return response;
    }
   
    Logger.error(messageError);
    throw new AppError(codeError, messageError);
  }
}

export default IndexUserService;
