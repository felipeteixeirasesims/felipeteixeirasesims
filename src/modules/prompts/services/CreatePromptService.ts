import Logger from '@config/logger';
import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import AppError from '@shared/errors/AppError';
import Prompt from '@shared/infra/http/entities/Prompt';
import OutputType from '@shared/infra/http/enuns/OutputType';
import { inject, injectable } from 'tsyringe';
import IPromptRepository from '../repositories/IPromptRepository';

interface IRequestDTO {
  title: string;
  description: string;
  prompt: string;
  outputType: OutputType;
  creatorId: string;
  categoryId: string;
}

@injectable()
class CreatePromptService {
  constructor(
    @inject('PromptRepository')
    private promptRepository: IPromptRepository,
    @inject('CategoryRepository')
    private categoriesRepository: ICategoryRepository
  ) {}

  public async execute({
    title,
    description,
    prompt,
    outputType,
    creatorId,
    categoryId
  }: IRequestDTO): Promise<Prompt> {
    const codeError = 'Invalid_registration';
    const categoryError = "Category doesn't exist";
    const promptError = 'Prompt title already exists';

    const checkPromptExists = await this.promptRepository.findByName(title);
    const checkCategoryExists = await this.categoriesRepository.find(
      categoryId
    );

    if (checkPromptExists) {
      Logger.error(promptError);
      throw new AppError(codeError, promptError);
    }

    if (!checkCategoryExists) {
      Logger.error(categoryError);
      throw new AppError(codeError, categoryError);
    }

    const promptResult = await this.promptRepository.create({
      title,
      description,
      prompt,
      outputType,
      creatorId,
      categoryId
    });

    Logger.warn(`INSERT INTO prompt (name) values ${promptResult.title}}`);

    return promptResult;
  }
}

export default CreatePromptService;
