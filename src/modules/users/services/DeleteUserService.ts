import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import Logger from '@config/logger';
import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({ id }: IRequestDTO): Promise<void> {
    const codeError = "Invalid_delete"
    const messageError = "User doesn't exist";
    const messageErrorAssociated = 'User has associated phones'
    
    const user = await this.usersRepository.find(id);

    console.log(user?.sessions?.some(session => session.id))
    if (!user) {
      Logger.error(messageError);
      throw new AppError(codeError, messageError);
    } 
    await this.usersRepository.delete(id);
    
  }
}

export default DeleteUserService;
