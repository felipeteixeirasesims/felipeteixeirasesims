import CreateUserService from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CreateUserController {
  constructor(private service?: CreateUserService) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    /**
     * #swagger.tags=['User']
     */
    const data = request.body;

    this.service = container.resolve(CreateUserService);

    const user = await this.service.execute({ ...data });

    return response.status(201).json(user);
  }
}
