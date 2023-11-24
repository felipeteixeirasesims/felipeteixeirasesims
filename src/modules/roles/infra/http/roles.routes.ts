import { Router } from 'express';
import  IndexRoleController  from '@modules/roles/infra/http/controllers/IndexRoleController';

const rolesRouter = Router();

const indexRoleController = new IndexRoleController();

rolesRouter.get(
  '/',
  indexRoleController.handle
);

export default rolesRouter;
