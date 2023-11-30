import CategoryRepository from '@modules/categories/repositories/CategoryRepository';
import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import IPromptRepository from '@modules/prompts/repositories/IPromptRepository';
import PromptRepository from '@modules/prompts/repositories/PromptRepository';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import RolesRepository from '@modules/roles/repositories/RolesRepository';
import ISessionRepository from '@modules/sessions/repositories/ISessionRepository';
import SessionsRepository from '@modules/sessions/repositories/SessionsPrismaRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { container } from 'tsyringe';
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

container.registerSingleton<IPromptRepository>(
  'PromptRepository',
  PromptRepository
);

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
);

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider
);
