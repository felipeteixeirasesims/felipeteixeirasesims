import IndexRoleService from '@modules/roles/services/IndexRoleService';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type ReqQuery = {
  name: string;
} & IPaginationDTO;

export default class IndexRoleController {
  constructor(private service?: IndexRoleService) {}

  public async handle(
    request: Request<unknown, unknown, unknown, ReqQuery>,
    response: Response
  ): Promise<Response> {
    /**
     * #swagger.tags=['Role']
     */
    const { name, limit, page } = request.query;
    this.service = container.resolve(IndexRoleService);

    const roles = await this.service.execute({ name, limit, page });
    return response.json(roles);
  }
}
