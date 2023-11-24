import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import Logger from '@config/logger';
import User from '@shared/infra/http/entities/User';

interface IRequestDTO {
  id: string;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({ id }: IRequestDTO): Promise<User> {
    const codeError = 'Invalid_search'
    const messageError = "User doesn't exist";

    const user = await this.usersRepository.find(id);

    if (user) {
      delete user.password;
      return user;
    }
    Logger.error(messageError);
    throw new AppError(codeError, messageError);
  }
}

export default ShowUserService;
