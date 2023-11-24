import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import Logger from '@config/logger';
import User from '@shared/infra/http/entities/User';

interface IRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  phones: string[];
  roleId: string;
  supervisorId?: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({ firstName, lastName, email, password, dateOfBirth, phones,
    roleId, supervisorId }: IRequestDTO): Promise<User> {
    const codeError = 'Invalid_registration'
    const messageError = 'E-mail address already exists';
    
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      Logger.error(messageError);
      throw new AppError(codeError, messageError);
    }

    const hashedPassword = await hash(password, 8);
    console.log(typeof(dateOfBirth))
    const user = await this.usersRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dateOfBirth: new Date(dateOfBirth),
      phones,
      roleId,
      supervisorId
    });

    delete user.password;

    Logger.warn(
      `INSERT INTO user (name, email) values ${user.firstName}, ${user.email}`
    );

    return user;
  }
}

export default CreateUserService;
