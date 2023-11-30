import PromptRemakeService from '@modules/prompts/services/PromptRemakeService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PromptRemakeController {
  public async handle(request: Request, response: Response): Promise<Response> {
    /**
     * #swagger.tags=['Prompt']
     * #swagger.description = "Endpoint to remake a excerpt of a prompt result. This endpoint will fail if the prompt doesn't have a prompt result."
     */

    const { promptId, guidance, excerpt } = request.body;
    const promptRemakeService = container.resolve(PromptRemakeService);

    const categories = await promptRemakeService.execute({
      promptId,
      guidance,
      excerpt
    });
    return response.json(categories);
  }
}
