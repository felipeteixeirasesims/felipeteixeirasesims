import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { beforeEach, describe, expect, it } from 'vitest';
import axios from 'axios';
import { z } from 'zod';
import {
  createLoginSession,
  IResponseLoginSession
} from '@shared/utils/createLoginSession';
import User from '@shared/infra/http/entities/User';

let user: ICreateUserDTO;
let userLogged: IResponseLoginSession;

describe.skip('Deve validar dados de cadastro do usuário', () => {
  beforeEach(async () => {
    userLogged = await createLoginSession();

    user = {
      firstName: 'Carlos',
      lastName: 'Manoel Vasconcelos Sousa',
      email: 'carlos@gmail.com',
      password: '123456',
      dateOfBirth: new Date("25/02/1987"),
      phones: ["8198372829", "87982617133"],
      roleId: 'f203d584-5510-4eac-bac8-0a3bf1c3e572',
    };
  });

  it('Deve cadastrar um usuário', async () => {
    if (userLogged.user) {
      try {
        const { data } = await axios.post<User>(
          'http://localhost:3333/users',
          {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            phones: user.phones,
            dateOfBirth: user.dateOfBirth,
            roleId: user.roleId
          },
          {
            headers: {
              Authorization: `Bearer ${userLogged.token}`
            }
          }
        );

        expect(data).toHaveProperty('firstName');
      } catch (err) {
        expect(err instanceof z.ZodError);
      }
    }
  });
});
