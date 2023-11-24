import { Router } from 'express';
import { z } from "zod";
import CreateSessionUserController from '@modules/sessions/infra/http/controllers/CreateSessionController';
import CreateRefreshTokenUserController from '@modules/sessions/infra/http/controllers/CreateRefreshTokenController';
import {zodValidation} from '@shared/infra/http/middlewares/ensureValidation';

const sessionsRouter = Router();

const sessionsController = new CreateSessionUserController();

const refreshTokenController = new CreateRefreshTokenUserController();


const dataSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }).email(),
    password: z
      .string({
        required_error: "Email is required",
      })
      .min(6),
  }),
});

sessionsRouter.post(
  '/',zodValidation(dataSchema),
  sessionsController.handle
);

sessionsRouter.post('/refresh-token', refreshTokenController.handle);

export default sessionsRouter;
