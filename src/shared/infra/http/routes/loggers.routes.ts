import { Router } from 'express';

import LoggerController from '../controllers/LoggerController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { isAdmin } from '@shared/infra/http/middlewares/ensureAuthorization';

const loggersRouter = Router();

const createLoggerController = new LoggerController();

loggersRouter.get('/', ensureAuthenticated, isAdmin(), 
createLoggerController.handle
);

export default loggersRouter;
