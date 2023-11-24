import { Router } from 'express';
import CreateProjectController from '@modules/projects/infra/http/controllers/CreateProjectController';
import IndexProjectController from '@modules/projects/infra/http/controllers/IndexProjectController';

const projectsRouter = Router();

const createProjectController = new CreateProjectController();

const indexProjectController = new IndexProjectController();

projectsRouter.get(
  '/',
  indexProjectController.handle
);

projectsRouter.post('/', createProjectController.handle);

export default projectsRouter;
