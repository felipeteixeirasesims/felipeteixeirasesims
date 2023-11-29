import { Router } from 'express';

import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import promptsRouter from '@modules/prompts/infra/http/prompts.routes';
import rolesRouter from '@modules/roles/infra/http/roles.routes';
import sessionsRouter from '@modules/sessions/infra/http/sessions.routes';
import usersFavoritesRouter from '@modules/userfavorites/infra/http/routes/userfavorites.routes';
import usersRouter from '@modules/users/infra/http/users.routes';
import loggersRouter from '@shared/infra/http/routes/loggers.routes';
const routes = Router();

routes.use('/users', usersRouter);
routes.use('/roles', rolesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/prompts', promptsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/userfavorites', usersFavoritesRouter);
routes.use('/loggers', loggersRouter);

export default routes;
