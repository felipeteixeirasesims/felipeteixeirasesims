import { zodValidation } from '@shared/infra/http/middlewares/ensureValidation';
import { Router } from 'express';
import { z } from 'zod';
import CreateCategoryController from '../controllers/CreateCategoryController';
import IndexCategoryController from '../controllers/IndexCategoryController';

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();

const indexCategoryController = new IndexCategoryController();

const dataSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required'
    }),
    description: z.string({
      required_error: 'Description is required'
    })
  })
});

categoriesRouter.get('/', indexCategoryController.handle);

categoriesRouter.post(
  '/',
  zodValidation(dataSchema),
  createCategoryController.handle
);

export default categoriesRouter;
