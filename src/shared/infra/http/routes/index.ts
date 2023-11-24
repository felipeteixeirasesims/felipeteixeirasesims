import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/users.routes';
import sessionsRouter from '@modules/sessions/infra/http/sessions.routes';
import loggersRouter from '@shared/infra/http/routes/loggers.routes';
import rolesRouter from '@modules/roles/infra/http/roles.routes';
import budgetsRouter from '@modules/budgets/infra/http/routes/budgets.routes';
import projectsRouter from '@modules/projects/infra/http/projects.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/roles', rolesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/projects', projectsRouter);
routes.use('/budgets', budgetsRouter);
routes.use('/loggers', loggersRouter);

export default routes;
