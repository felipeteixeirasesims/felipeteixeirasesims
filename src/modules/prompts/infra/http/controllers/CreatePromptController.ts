import CreatePromptService from '@modules/prompts/services/CreatePromptService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CreatePromptController {
  constructor(private service?: CreatePromptService) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    /**
     * #swagger.tags=['Prompt']
     */
    const { title, description, prompt, outputType, creatorId, categoryId } =
      request.body;

    this.service = container.resolve(CreatePromptService);

    const promptResult = await this.service.execute({
      title,
      description,
      prompt,
      outputType,
      creatorId,
      categoryId
    });

    return response.status(201).json(promptResult);
  }
}
