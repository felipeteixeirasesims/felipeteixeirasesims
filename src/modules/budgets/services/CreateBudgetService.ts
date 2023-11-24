import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Logger from '@config/logger';
import IBudgetRepository from '../repositories/IBudgetRepository';
import Budget from '@shared/infra/http/entities/Budget';
import IProjectRepository from '@modules/projects/repositories/IProjectRepository';

interface IRequestDTO {
  amount: number;
  projectId: string;
}

@injectable()
class CreateBudgetService {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetRepository,
    @inject('ProjectsRepository')
    private projectsRepository: IProjectRepository
  ) {}

  public async execute({ amount, projectId }: IRequestDTO): Promise<Budget> {
    const codeError = 'Invalid_registration'
    const messageError = 'Project not exists';

    const checkProjectsExists = await this.projectsRepository.find(projectId);

    if (!checkProjectsExists) {
      Logger.error(messageError);
      throw new AppError(codeError, messageError);
    } 
    
    const budget = await this.budgetsRepository.create({
      amount,
      projectId
    });

    Logger.warn(
      `INSERT INTO budgets (amount) values ${budget.amount}}`
    );

    return budget;
  }
}

export default CreateBudgetService;
