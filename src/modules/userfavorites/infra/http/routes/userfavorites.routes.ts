import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { zodValidation } from '@shared/infra/http/middlewares/ensureValidation';
import { Router } from 'express';
import { z } from 'zod';
import CreateUserFavoritesController from '../controllers/CreateUserFavoritesController';
import DeleteUserFavoritesController from '../controllers/DeleteUserFavoritesController';
import IndexUserFavoritesController from '../controllers/IndexUserFavoritesController';

const userFavoritesRouter = Router();

const createUserFavoritesController = new CreateUserFavoritesController();

const indexUserFavoritesController = new IndexUserFavoritesController();

const deleteUserFavoritesController = new DeleteUserFavoritesController();

const dataSchema = z.object({
  body: z.object({
    promptId: z.string({
      required_error: 'promptId is required'
    })
  })
});

userFavoritesRouter.get('/', indexUserFavoritesController.handle);

userFavoritesRouter.post(
  '/',
  ensureAuthenticated,
  zodValidation(dataSchema),
  createUserFavoritesController.handle
);

userFavoritesRouter.delete('/:id', deleteUserFavoritesController.handle);

export default userFavoritesRouter;
