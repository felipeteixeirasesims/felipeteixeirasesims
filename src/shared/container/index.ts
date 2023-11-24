import { container } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import ISessionRepository from '@modules/sessions/repositories/ISessionRepository';
import SessionsRepository from '@modules/sessions/repositories/SessionsPrismaRepository';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import RolesRepository from '@modules/roles/repositories/RolesRepository';
import IProjectRepository from '@modules/projects/repositories/IProjectRepository';
import ProjectsRepository from '@modules/projects/repositories/ProjectsRepository';
import IBudgetRepository from '@modules/budgets/repositories/IBudgetRepository';
import BudgetsRepository from '@modules/budgets/repositories/BudgetRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from './providers/DateProvider/DaysjsDateProvider';

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IRoleRepository>(
  'RolesRepository',
  RolesRepository
);

container.registerSingleton<ISessionRepository>(
  'SessionsRepository',
  SessionsRepository
);

container.registerSingleton<IProjectRepository>(
  'ProjectsRepository',
  ProjectsRepository
);

container.registerSingleton<IBudgetRepository>(
  'BudgetsRepository',
  BudgetsRepository
);

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider
);
