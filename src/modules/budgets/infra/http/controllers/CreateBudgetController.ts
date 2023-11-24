import CreateBudgetService from '@modules/budgets/services/CreateBudgetService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CreateBudgetController {
  constructor(private service?: CreateBudgetService) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    this.service = container.resolve(CreateBudgetService);

    const project = await this.service.execute({ ...data });

    return response.status(201).json(project);
  }
}
