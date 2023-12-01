import { Router } from 'express';
import { z } from "zod";
import CreateUserController from './controllers/CreateUserController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import DeleteUserController from '@modules/users/infra/http/controllers/DeleteUserController';
import IndexUserController from '@modules/users/infra/http/controllers/IndexUserController';
import ShowUserController from '@modules/users/infra/http/controllers/ShowUserController';
import UpdateUserController from '@modules/users/infra/http/controllers/UpdateUserController';
import { isAdmin } from "@shared/infra/http/middlewares/ensureAuthorization";
import {
  optionalPageAndLimit,
  optionalSortByAndOrderBy,
  optionalStringToBoolean
} from "@shared/utils/zodUtils";
import { zodValidation } from '@shared/infra/http/middlewares/ensureValidation';

const usersRouter = Router();

const createUserController = new CreateUserController();

const indexUserController = new IndexUserController();

const showUserController = new ShowUserController();

const updateUserController = new UpdateUserController();

const deleteUserController = new DeleteUserController();

const userSchema = z.object({
  body: z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  dateOfBirth: z.string(),
  phones: z.array(
    z.string()
  ),
  roleId: z.string().uuid(),
  supervisorId: z.string().uuid().optional().nullable()
  })
});

usersRouter.get('/', ensureAuthenticated, isAdmin(), indexUserController.handle);

usersRouter.post('/', zodValidation(userSchema), createUserController.handle);

usersRouter.get('/me', ensureAuthenticated, showUserController.handle);

usersRouter.put('/:id', ensureAuthenticated, updateUserController.handle);

usersRouter.delete('/:id', ensureAuthenticated, isAdmin(), deleteUserController.handle);

export default usersRouter;
