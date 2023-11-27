import IndexPromptService from '@modules/prompts/services/IndexPromptService';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type ReqQuery = {
  name: string;
} & IPaginationDTO;

export default class IndexPromptController {
  constructor(private service?: IndexPromptService) {}

  public async handle(
    request: Request<unknown, unknown, unknown, ReqQuery>,
    response: Response
  ): Promise<Response> {
    /**
     * #swagger.tags=['Prompt']
     */
    const { name, limit, page } = request.query;
    this.service = container.resolve(IndexPromptService);

    const categories = await this.service.execute({ name, limit, page });
    return response.json(categories);
  }
}
