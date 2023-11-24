import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@shared/infra/http/entities/User';
import Logger from '@config/logger';
import AppError from '@shared/errors/AppError';
import Phone from '@shared/infra/http/entities/Phone';

interface IRequestDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  phones: Phone[];
  roleId: string;
  supervisorId?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute(
   request: IRequestDTO): Promise<User> {
    const codeError = 'Invalid_update'
    const messageError = 'User name already in use';

    const {id, firstName, lastName, email, password, dateOfBirth, phones, roleId, supervisorId} = request;
    const hashedPassword = await hash(password, 8);
    const existingUser = await this.usersRepository.find(id);

    if (!existingUser) {
  
      Logger.error(messageError);
      throw new AppError(codeError, messageError);
    } else {
      const otherUser = await this.usersRepository.findByFirstName(request.firstName);

      if (otherUser?.firstName === request.firstName && otherUser.id !== request.id) {
        Logger.error(messageError);
        throw new AppError(codeError, messageError);
      }

      const user = await this.usersRepository.update({
        id,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        dateOfBirth: new Date(dateOfBirth),
        phones,
        roleId,
        supervisorId
      });

      Logger.warn(`INSERT INTO utes (name) values ${user.firstName}`);

      return user;
    }
  }
}

export default UpdateUserService;
