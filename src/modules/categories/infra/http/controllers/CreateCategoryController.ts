import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CreateCategoryController {
  constructor(private service?: CreateCategoryService) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    /**
     * #swagger.tags=['Category']
     */
    const { name, description } = request.body;

    this.service = container.resolve(CreateCategoryService);

    const project = await this.service.execute({ name, description });

    return response.status(201).json(project);
  }
}
