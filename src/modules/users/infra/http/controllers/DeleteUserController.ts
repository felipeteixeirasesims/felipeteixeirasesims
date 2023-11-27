import DeleteUserService from '@modules/users/services/DeleteUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class DeleteUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    /**
     * #swagger.tags=['User']
     */
    const { id } = request.params;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute({ id });

    return response.json();
  }
}
