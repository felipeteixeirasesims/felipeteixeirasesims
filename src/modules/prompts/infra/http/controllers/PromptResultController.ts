import PromptResultService from '@modules/prompts/services/PromptResultService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PromptResultController {
  public async handle(request: Request, response: Response): Promise<Response> {
    /**
     * #swagger.tags=['Prompt']
     * #swagger.description = "Endpoint to create a prompt result. This endpoint uses the API of the OpenAI to generate the prompt result."
     * #swagger.security=[{"bearerAuth": []}]
     */
    const { promptId } = request.body;
    const { id: userId } = request.user;

    const promptResultService = container.resolve(PromptResultService);

    const categories = await promptResultService.execute({ userId, promptId });
    return response.json(categories);
  }
}
