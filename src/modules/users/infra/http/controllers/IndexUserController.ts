import IndexUserService from '@modules/users/services/IndexUserService';
import IOrdinationDTO from '@shared/dtos/IOrdinationDTO';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type ReqQuery = {
  firstName?: string;
} & IPaginationDTO &
  IOrdinationDTO; ;

export default class IndexUserController {
  constructor(private service?: IndexUserService) {}

  public async handle(
    request: Request<unknown, unknown, unknown, ReqQuery>,
    response: Response
  ): Promise<Response> {
    /**
     * #swagger.tags=['User']
     * #swagger.security=[{"bearerAuth": []}]
     * #swagger.summary='Get all users'
     * #swagger.description='This endpoint will get all users ordered'
     */
    const { firstName, limit, page, sortBy, orderBy } = request.query;
    this.service = container.resolve(IndexUserService);

    const users = await this.service.execute({
      firstName,
      limit,
      page,
      sortBy,
      orderBy
    });
    return response.json(users);
  }
}
