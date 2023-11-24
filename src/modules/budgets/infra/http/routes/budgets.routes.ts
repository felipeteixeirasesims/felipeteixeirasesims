import { Router } from 'express';
import CreateBudgetController from '../controllers/CreateBudgetController';
import IndexBudgetController from '../controllers/IndexBudgetController';


const budgetsRouter = Router();

const createBudgetController = new CreateBudgetController();

const indexBudgetController = new IndexBudgetController();

budgetsRouter.get(
  '/',
  indexBudgetController.handle
);

budgetsRouter.post('/', createBudgetController.handle);

export default budgetsRouter;
