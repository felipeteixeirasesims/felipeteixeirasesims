import CreateUserFavoritesService from '@modules/userfavorites/services/CreateUserFavoritesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CreateUserFavoritesController {
  constructor(private service?: CreateUserFavoritesService) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    /**
     * #swagger.tags=['User Favorites']
     * #swagger.security=[{"bearerAuth": []}]
     */
    const { promptId } = request.body;
    const { id: userId } = request.user;

    this.service = container.resolve(CreateUserFavoritesService);
    const userFavorite = await this.service.execute({ userId, promptId });

    return response.status(201).json(userFavorite);
  }
}
