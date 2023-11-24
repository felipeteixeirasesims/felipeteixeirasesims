import 'reflect-metadata';

import 'dotenv/config';

import cors from 'cors';

import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';

import swaggerUi from 'swagger-ui-express';

import swaggerFile from '@shared/documentation.json';

import routes from '@shared/infra/http/routes';

import AppError from '@shared/errors/AppError';

import '@shared/container';

import ensureLogger from '@shared/infra/http/middlewares/ensureLogger';

import { appValidation, serverValidation } from '@shared/infra/http/middlewares/ensureValidation';

import ServerError from '@shared/errors/ServerError';

const app = express();

app.use(ensureLogger);
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);
app.use(
  (err: ServerError, request: Request, response: Response, next: NextFunction) => {
   
    if (err instanceof AppError) {
      const appError = appValidation(err, request, response, next);
      return response.status(err.statusCode).json(
        appError
      );
    }
    const serverError = serverValidation(err, request, response, next);
    return response.status(500).json(serverError);
  }
);

export { app };
