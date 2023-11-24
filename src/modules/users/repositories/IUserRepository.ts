import User from '@shared/infra/http/entities/User';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IReadUserDTO from '@modules/users/dtos/IReadUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';


export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  all(data: IReadUserDTO): Promise<PaginatedResponse<User[]>>;
  find(id: string): Promise<User>;
  findByFirstName(firstName: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(data: IUpdateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
}
