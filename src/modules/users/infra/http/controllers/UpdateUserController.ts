import { Request, Response } from 'express';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import { container } from 'tsyringe';

export default class UpdateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { firstName, lastName, email, password, dateOfBirth, phones, roleId, supervisorId } = request.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      id,
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      phones,
      roleId,
      supervisorId
    });

    return response.json(user);
  }
}
