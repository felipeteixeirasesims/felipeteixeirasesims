import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IReadUserDTO from '@modules/users/dtos/IReadUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';

import { v4 as uuidv4 } from 'uuid';
import IUserRepository from './IUserRepository';
import Phone from '@shared/infra/http/entities/Phone';
import User from '@shared/infra/http/entities/User';

class UsersRepositoryInMemory implements IUserRepository {
  
  users: User[] = [];
  phone: Phone;

  phones: Phone[] = [
    {
    id: uuidv4(),
    phone: '81999863628',
    userId: '922944fd-e7ec-4f3f-ae5a-00b2bb6dc97c'
    },
    {
      id: uuidv4(),
      phone: '81988727282',
      userId: '922944fd-e7ec-4f3f-ae5a-00b2bb6dc97c'
    }
  ]

  async create(data: ICreateUserDTO): Promise<User> {
    const user: User = {
      id: '922944fd-e7ec-4f3f-ae5a-00b2bb6dc97c',
      ...data,
      phones: this.phones,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.users.push(user);

    return { ...user };
  }

  async all(data: IReadUserDTO): Promise<PaginatedResponse<User[]>> {
    let { users } = this;
    let itemCount = this.users.length;

    if (data?.firstName) {
      users = this.users.filter(user => user.firstName.startsWith(data.firstName));
      itemCount = users.length;
    }

    if (data?.page && data.limit) {
      users = this.users.slice(
        (data.page - 1) * data.limit,
        (data.page - 1) * data.limit + data.limit
      );
    }

    return {
      data: users.sort((u1, u2) => u1.firstName.localeCompare(u2.firstName)),
      itemCount,
      pageCount: Math.ceil(users.length / (data?.limit || 10))
    };
  }

  async find(id: string): Promise<User> {
    return this.users.find(users => users.id === id);
  }

  async findByFirstName(name: string): Promise<User> {
    const user = this.users.find(u => u.firstName === name);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(u => u.email === email);
    return user;
  }

  async update(data: IUpdateUserDTO): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === data.id);

    if (userIndex >= 0) {
      const user: User = {
        id: '922944fd-e7ec-4f3f-ae5a-00b2bb6dc97c',
        ...data,
        phones: this.phones,
        createdAt: this.users[userIndex].createdAt,
        updatedAt: new Date()
      };
      this.users[userIndex] = user;
      return user;
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id);
  }
}

export default UsersRepositoryInMemory;
