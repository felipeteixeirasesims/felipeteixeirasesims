import { zodValidation } from '@shared/infra/http/middlewares/ensureValidation';
import { Router } from 'express';
import { z } from 'zod';
import CreatePromptController from './controllers/CreatePromptController';
import IndexPromptController from './controllers/IndexPromptController';

const promptRouter = Router();

const createPromptController = new CreatePromptController();

const indexPromptController = new IndexPromptController();

const dataSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required'
    }),
    description: z.string({
      required_error: 'Description is required'
    }),
    prompt: z.string({
      required_error: 'Prompt is required'
    }),
    outputType: z.string({
      required_error: 'OutputType is required'
    }),
    creatorId: z.string({
      required_error: 'CreatorId is required'
    })
  })
});

promptRouter.get('/', indexPromptController.handle);

promptRouter.post(
  '/',
  zodValidation(dataSchema),
  createPromptController.handle
);

export default promptRouter;
