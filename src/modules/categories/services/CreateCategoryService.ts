import Logger from '@config/logger';
import Category from '@shared/infra/http/entities/Category';
import { inject, injectable } from 'tsyringe';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequestDTO {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoriesRepository: ICategoryRepository
  ) {}

  public async execute({ name, description }: IRequestDTO): Promise<Category> {
    const codeError = 'Invalid_registration';
    const messageError = 'Project not exists';

    const category = await this.categoriesRepository.create({
      name,
      description
    });

    Logger.warn(`INSERT INTO categories values ${category.name}}`);

    return category;
  }
}

export default CreateCategoryService;
