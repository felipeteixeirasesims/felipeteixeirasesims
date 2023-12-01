import CreateProjectService from '@modules/projects/services/CreateProjectService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CreateProjectController {
  constructor(private service?: CreateProjectService) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    /**
     * #swagger.tags=['Project']
     */
    const data = request.body;

    this.service = container.resolve(CreateProjectService);

    const project = await this.service.execute({ ...data });

    return response.status(201).json(project);
  }
}
