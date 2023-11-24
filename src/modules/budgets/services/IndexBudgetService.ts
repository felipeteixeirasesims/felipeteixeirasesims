import Logger from '@config/logger';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Budget from '@shared/infra/http/entities/Budget';
import IBudgetRepository from '../repositories/IBudgetRepository';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';

interface IRequestDTO extends IPaginationDTO {
  amount?: number;
}

@injectable()
class IndexBudgetService {
  constructor(
    @inject('BudgetsRepository')
    private budgetRepository: IBudgetRepository
  ) {}

  public async execute(data: IRequestDTO): Promise<PaginatedResponse<Budget[]>> {
    const codeError = "Invalid_list"
    const messageError = "Budget doesn't exist";

    const response = await this.budgetRepository.all({ ...data });
    if (response.data) {
      return response;
    }
    Logger.error(messageError);
    throw new AppError(codeError, messageError);
  }
}

export default IndexBudgetService;
