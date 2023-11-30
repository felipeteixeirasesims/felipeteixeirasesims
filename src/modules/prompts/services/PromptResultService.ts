import Logger from '@config/logger';
import AppError from '@shared/errors/AppError';
import PromptResult from '@shared/infra/http/entities/PromptResult';
import { inject, injectable } from 'tsyringe';
import IPromptRepository from '../repositories/IPromptRepository';
import IPromptResultRepository from '../repositories/IPromptResultRepository';

interface IRequestDTO {
  userId: string;
  promptId: string;
}

@injectable()
class PromptResultService {
  constructor(
    @inject('PromptRepository')
    private promptRepository: IPromptRepository,
    @inject('PromptResultRepository')
    private promptResultRepository: IPromptResultRepository
  ) {}

  public async execute({
    userId,
    promptId
  }: IRequestDTO): Promise<PromptResult> {
    const codeError = 'Invalid_list';
    const messageError = "Prompt doesn't exist";
    const promptResultError = 'Prompt result for this prompt already exists';

    const promptRepository = await this.promptRepository.find(promptId);
    if (!promptRepository) {
      Logger.error(messageError);
      throw new AppError(codeError, messageError, 401);
    }

    const promptResult = await this.promptResultRepository.findByPromptId(
      promptId
    );
    if (promptResult) {
      Logger.error(promptResultError);
      throw new AppError(codeError, promptResultError, 401);
    }

    const promptResultRepository = await this.promptResultRepository.create({
      userId,
      title: promptRepository.title,
      promptId: promptRepository.id,
      used_prompt: promptRepository.prompt,
      generated_output: 'generated_output'
    });

    return promptResultRepository;
  }
}

export default PromptResultService;
