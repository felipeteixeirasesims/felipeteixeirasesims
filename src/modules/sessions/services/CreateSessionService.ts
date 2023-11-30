import auth from '@config/auth';
import Logger from '@config/logger';
import ISessionRepository from '@modules/sessions/repositories/ISessionRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';
import User from '@shared/infra/http/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
  refreshToken: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('SessionsRepository')
    private sessionsRepository: ISessionRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    const codeError = 'invalid_login';
    const messageError = 'Incorrect email and password combination!';
    if (!user) {
      Logger.error(messageError);
      throw new AppError(codeError, messageError, 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      Logger.error(messageError);
      throw new AppError(codeError, messageError, 401);
    }

    const {
      secret,
      expiresIn,
      secretRefreshToken,
      expiresInRefresh,
      expiresRefreshTokenDays
    } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
      algorithm: 'HS512'
    });

    const refreshToken = sign({}, secretRefreshToken, {
      subject: user.id,
      expiresIn: expiresInRefresh,
      algorithm: 'HS512'
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      expiresRefreshTokenDays
    );

    await this.sessionsRepository.create({
      expiresDate: refreshTokenExpiresDate,
      refreshToken: refreshToken,
      userId: user.id
    });

    delete user.roleId;

    return { user, token, refreshToken };
  }
}

export default CreateSessionService;
