import CategoryRepository from '@modules/categories/repositories/CategoryRepository';
import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import IPromptRemakeRepository from '@modules/prompts/repositories/IPromptRemakeRepository';
import IPromptRepository from '@modules/prompts/repositories/IPromptRepository';
import IPromptResultRepository from '@modules/prompts/repositories/IPromptResultRepository';
import PromptRemakeRepository from '@modules/prompts/repositories/PromptRemakeRepository';
import PromptRepository from '@modules/prompts/repositories/PromptRepository';
import PromptResultRepository from '@modules/prompts/repositories/PromptResultRepository';
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

container.registerSingleton<IPromptResultRepository>(
  'PromptResultRepository',
  PromptResultRepository
);

container.registerSingleton<IPromptRemakeRepository>(
  'PromptRemakeRepository',
  PromptRemakeRepository
);

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
);

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider
);
