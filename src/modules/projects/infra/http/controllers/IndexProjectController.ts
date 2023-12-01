import IndexProjectService from '@modules/projects/services/IndexProjectService';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type ReqQuery = {
  name: string;
} & IPaginationDTO;

export default class IndexProjectController {
  constructor(private service?: IndexProjectService) {}

  public async handle(
    request: Request<unknown, unknown, unknown, ReqQuery>,
    response: Response
  ): Promise<Response> {
    /**
     * #swagger.tags=['Project']
     */
    const { name, limit, page } = request.query;
    this.service = container.resolve(IndexProjectService);

    const projects = await this.service.execute({ name, limit, page });
    return response.json(projects);
  }
}
