import Logger from "@config/logger";
import i18n from 'i18n';
import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import AppError from "@shared/errors/AppError";
import translation from "@config/translation";
import ServerError from "@shared/errors/ServerError";

i18n.configure(translation);

const initTranslation = (req: Request, res: Response, next: NextFunction) => {
  i18n.init(req, res);
  req.getLocale() == 'pt'
    ? res.setHeader('Content-Language', 'pt-BR')
    : res.setHeader('Content-Language', 'en-US');
}

const zodValidation = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      initTranslation(req, res, next);
        if (error instanceof Object && 'issues' in error) {
          const issuesArray = error.issues as any[];
          issuesArray.map(e => {
            e.message = res.__(e.message);
          });
        }
      Logger.error(error);
      return res.status(400).json(
        error
      );
    }
};

const appValidation = (err: AppError, req: Request, res: Response, next: NextFunction) => {
const currentDate = new Date();
const timestamp = currentDate.toISOString();
initTranslation(req, res, next);
return {
  issues: [
    {
      validation: err.validation,
      code: err.code,
      message: res.__(err.message),
      path: err.path
    },
  ],
  name: err.name,
  level: err.level,
  timestamp: timestamp  
} 
}

const serverValidation = (err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const currentDate = new Date();
  const timestamp = currentDate.toISOString();
  initTranslation(req, res, next);
  return {
    issues: [
      {
        message: err.stack,
      },
    ],
    name: 'ServerError',
    level: 'error',
    timestamp: timestamp  
  } 
  }

export {zodValidation, appValidation, serverValidation};