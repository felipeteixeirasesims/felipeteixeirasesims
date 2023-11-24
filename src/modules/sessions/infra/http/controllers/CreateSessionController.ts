import CreateSessionService from '@modules/sessions/services/CreateSessionService';
import { Request, Response } from 'express';

import { container } from 'tsyringe';

export default class SessionsController {
  public async handle(request: Request, response: Response): Promise<Response> {
     /**
     * #swagger.tags=['Session']
     */
    const { email, password } = request.body;

    const createSessionService = container.resolve(
      CreateSessionService
    );

    const {
      user,
      token,
      refreshToken: refreshToken
    } = await createSessionService.execute({
      email,
      password
    });

    delete user.password;

    return response.json({ user, token, refresh_token: refreshToken });
  }
}
