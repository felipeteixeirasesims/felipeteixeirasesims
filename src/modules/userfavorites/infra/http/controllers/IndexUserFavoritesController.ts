import IndexUserFavoritesService from '@modules/userfavorites/services/IndexUserFavoritesService';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type ReqQuery = {
  amount: number;
} & IPaginationDTO;

export default class IndexUserFavoritesController {
  constructor(private service?: IndexUserFavoritesService) {}

  public async handle(
    request: Request<unknown, unknown, unknown, ReqQuery>,
    response: Response
  ): Promise<Response> {
    /**
     * #swagger.tags=['User Favorites']
     * #swagger.security=[{"bearerAuth": []}]
     *
     */
    const { amount, limit, page } = request.query;
    this.service = container.resolve(IndexUserFavoritesService);

    const userfavorites = await this.service.execute({ amount, limit, page });
    return response.json(userfavorites);
  }
}
