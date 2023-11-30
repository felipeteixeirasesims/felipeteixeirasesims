import Logger from '@config/logger';
import AppError from '@shared/errors/AppError';
import PromptRemake from '@shared/infra/http/entities/PromptRemake';
import { inject, injectable } from 'tsyringe';
import IPromptRemakeRepository from '../repositories/IPromptRemakeRepository';
import IPromptRepository from '../repositories/IPromptRepository';
import IPromptResultRepository from '../repositories/IPromptResultRepository';

interface IRequestDTO {
  userId: string;
  promptId: string;
  guidance: string;
  excerpt: string;
}

@injectable()
class PromptRemakeService {
  constructor(
    @inject('PromptRepository')
    private promptRepository: IPromptRepository,
    @inject('PromptRemakeRepository')
    private promptRemakeRepository: IPromptRemakeRepository,
    @inject('PromptResultRepository')
    private promptResultRepository: IPromptResultRepository
  ) {}

  public async execute({
    userId,
    promptId,
    guidance,
    excerpt
  }: IRequestDTO): Promise<PromptRemake> {
    const codeError = 'Invalid_list';
    const messageError = "Prompt doesn't exist";
    const promptResultError = "Prompt result for this prompt doesn't exists";

    const promptRepository = await this.promptRepository.find(promptId);
    if (!promptRepository) {
      Logger.error(messageError);
      throw new AppError(codeError, messageError, 401);
    }

    const promptResult = await this.promptResultRepository.findByPromptId(
      promptId
    );
    if (!promptResult) {
      Logger.error(promptResultError);
      throw new AppError(codeError, promptResultError, 401);
    }

    const promptRemakeRepository = await this.promptRemakeRepository.create({
      userId,
      promptId: promptRepository.id,
      guidance,
      excerpt
    });

    return promptRemakeRepository;
  }
}

export default PromptRemakeService;
