import { inject, injectable } from 'tsyringe';
import auth from '@config/auth';
import Logger from '@config/logger';
import AppError from '@shared/errors/AppError';
import { verify, sign } from 'jsonwebtoken';
import ISessionRepository from '@modules/sessions/repositories/ISessionRepository';

@injectable()
class CreateRefreshTokenService {
  constructor(
    @inject('SessionsRepository')
    private tokensRepository: ISessionRepository
  ) {}
  async execute(refreshToken: string): Promise<string> {
    console.log(refreshToken)
    const codeError = 'Invalid_login'
    const messageError = 'Invalid refresh token';
    try {
      verify(refreshToken, auth.jwt.secretRefreshToken);
    } catch (err) {
      const token = await this.tokensRepository.findByRefreshToken(refreshToken);
      console.log(token)
      if (token !== undefined) {
        await this.tokensRepository.delete(token.id);
      }
      Logger.error(messageError);
      throw new AppError(codeError, messageError);
    }

    const { sub } = verify(refreshToken, auth.jwt.secretRefreshToken);
    const userId = sub;
    const { secret, expiresIn } = auth.jwt;
    const newToken = sign({}, secret, {
      subject: userId.toString(),
      expiresIn,
      algorithm: 'HS512'
    });

    return newToken;
  }
}

export default CreateRefreshTokenService;
