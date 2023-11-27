import ShowUserService from '@modules/users/services/ShowUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ShowUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    /**
     * #swagger.tags=['User']
     */
    const id = request.user;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute(id);

    return response.json(user);
  }
}
