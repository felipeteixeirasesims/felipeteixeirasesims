import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import Logger from '@config/logger';

interface TokenPayload {
  sub: string;
}

export default function authorization(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const codeError = 'Invalid_login'
  const messageErrorMissingToken = 'Token is missing';
  const messageErrorInvalidToken = 'Invalid Token'
  const authHeader = request.headers.authorization;
  
  if (!authHeader) {
    Logger.error(messageErrorMissingToken);
    throw new AppError(codeError, messageErrorMissingToken, 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub
    };

    return next();
  } catch {
    Logger.error(messageErrorInvalidToken);
    throw new AppError(codeError, messageErrorMissingToken, 401);
  }
}
