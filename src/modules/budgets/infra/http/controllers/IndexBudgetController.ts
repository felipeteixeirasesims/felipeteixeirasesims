import IndexBudgetService from '@modules/budgets/services/IndexBudgetService';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type ReqQuery = {
  amount: number;
} & IPaginationDTO;

export default class IndexBudgetController {
  constructor(private service?: IndexBudgetService) {}

  public async handle(
    request: Request<unknown, unknown, unknown, ReqQuery>,
    response: Response
  ): Promise<Response> {
    /**
     * #swagger.tags=['Budget']
     */
    const { amount, limit, page } = request.query;
    this.service = container.resolve(IndexBudgetService);

    const projects = await this.service.execute({ amount, limit, page });
    return response.json(projects);
  }
}
