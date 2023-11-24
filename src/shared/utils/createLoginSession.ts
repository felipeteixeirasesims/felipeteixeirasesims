import SessionsRepository from '@modules/sessions/repositories/SessionsPrismaRepository';
import CreateSessionService from '@modules/sessions/services/CreateSessionService';
import UserRepository from '@modules/users/repositories/UsersRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/DaysjsDateProvider';
import User from '@shared/infra/http/entities/User';

interface IResponseLoginSession {
  user: User;
  token: string;
  refreshToken: string;
}

let usersRepository: UserRepository;
let sessionsRepository: SessionsRepository;
let createSessionService: CreateSessionService;
let dayjsDateProvider: DayjsDateProvider;

export async function createLoginSession() {
  usersRepository = new UserRepository();
  sessionsRepository = new SessionsRepository();
  dayjsDateProvider = new DayjsDateProvider();
  createSessionService = new CreateSessionService( 
    usersRepository,
    sessionsRepository,
    dayjsDateProvider
  );

  const loggedSession = await createSessionService.execute({
    email: 'carlosmanoel.com',
    password: '123456'
  });

  return loggedSession;
}

export { createSessionService, IResponseLoginSession };