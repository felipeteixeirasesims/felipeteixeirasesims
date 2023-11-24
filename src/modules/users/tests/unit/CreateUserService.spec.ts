import UsersRepositoryInMemory from '@modules/users/repositories/UsersRepositoryInMemory';
import CreateUserService from '@modules/users/services/CreateUserService';
import {describe, beforeAll, it, expect} from 'vitest';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserService: CreateUserService;

describe('Create user', () => {
  beforeAll(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(usersRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      firstName: 'Vinicius',
      lastName: 'Tavares',
      email: 'vinicius@email.com',
      password: '123456',
      dateOfBirth: new Date("03/05/1980"),
      phones: ["8198873627", "8798872627"],
      roleId: '1'
    });

    expect(user).toHaveProperty('firstName');
    expect(user.email).toBe('vinicius@email.com');
  });
});
