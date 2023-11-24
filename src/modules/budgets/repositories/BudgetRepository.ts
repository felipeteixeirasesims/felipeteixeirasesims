import { PrismaClient } from '@prisma/client';
import IBudgetRepository from '@modules/budgets/repositories/IBudgetRepository';
import Budget from '@shared/infra/http/entities/Budget';
import ICreateBudgetDTO from '@modules/budgets/dtos/ICreateBudgetDTO';
import IReadBugetDTO from '@modules/budgets/dtos/IReadBugetDTO';
import { PaginatedResponse } from '@shared/infra/http/PaginatedResponse';

class BudgetsRepository implements IBudgetRepository {
 
  prismaClient = new PrismaClient();

  public async create(data: ICreateBudgetDTO): Promise<Budget> {
  
    const budget = await this.prismaClient.budget.create({
      data: {
        ...data
        }
    });
    return budget;
  }

  public async all({
    amount,
    limit = 10,
    page = 1
  }: IReadBugetDTO): Promise<PaginatedResponse<Budget[]>> {
    const paginate = {
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    };

    const data = await this.prismaClient.budget.findMany({
      where: {
        amount: {
          gt: amount
        },
      },
      orderBy: {
        amount: 'asc'
      },
      ...paginate
    });
    let itemCount;
    if (amount) {
      itemCount = await this.prismaClient.budget.count({
        where: {
          amount: {
            gt: amount
          }
        }
      });
    } else {
      itemCount = await this.prismaClient.project.count();
    }

    const pageCount = Math.ceil(itemCount / limit);

    return { data, itemCount, pageCount };
  }
  
  public async find(id: string): Promise<Budget> {
    const budget = await this.prismaClient.budget.findFirst({
      where: {
        id
      }
    });
    return budget;
  }

  public async findByProjectId(projectId: string): Promise<Budget> {
    const budget = await this.prismaClient.budget.findFirst({
      where: {
        projectId
      }
    });
    return budget;
  }
}

export default BudgetsRepository;
