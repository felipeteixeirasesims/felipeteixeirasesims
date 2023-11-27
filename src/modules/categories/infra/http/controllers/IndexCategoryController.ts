import IndexCategoryService from '@modules/categories/services/IndexCategoryService';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type ReqQuery = {
  amount: number;
} & IPaginationDTO;

export default class IndexCategoryController {
  constructor(private service?: IndexCategoryService) {}

  public async handle(
    request: Request<unknown, unknown, unknown, ReqQuery>,
    response: Response
  ): Promise<Response> {
    /**
     * #swagger.tags=['Category']
     */
    const { amount, limit, page } = request.query;
    this.service = container.resolve(IndexCategoryService);

    const categories = await this.service.execute({ amount, limit, page });
    return response.json(categories);
  }
}
