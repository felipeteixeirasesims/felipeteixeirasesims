import DeleteUserFavoritesService from '@modules/userfavorites/services/DeleteUserFavoritesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class DeleteUserFavoritesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    /**
     * #swagger.tags=['User Favorites']
     * #swagger.security=[{"bearerAuth": []}]
     */
    const { id } = request.params;

    const deleteUserFavoriteService = container.resolve(
      DeleteUserFavoritesService
    );

    await deleteUserFavoriteService.execute({ id });

    return response.json();
  }
}
