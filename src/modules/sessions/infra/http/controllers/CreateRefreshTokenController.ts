import CreateRefreshTokenService from '@modules/sessions/services/CreateRefreshTokenService';
import { Request, Response } from 'express';

import { container } from 'tsyringe';

class CreateRefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    /**
     * #swagger.tags=['Session']
     */
    const { refreshToken } = request.body;
    const refreshTokenService = container.resolve(CreateRefreshTokenService);

    const token = await refreshTokenService.execute(refreshToken);

    return response.json({ token });
  }
}

export default CreateRefreshTokenController;
