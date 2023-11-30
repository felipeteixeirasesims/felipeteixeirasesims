import CreateLoggerService from '@shared/services/LoggerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class LoggerController {
  public async handle(request: Request, response: Response): Promise<Response> {
    /**
     * #swagger.tags=['Logger']
     */
    const initialDate = request.query.initial_date;
    const finalDate = request.query.final_date;
    const level = request.query.level;

    const filterLogger = container.resolve(CreateLoggerService);

    const result = await filterLogger.execut({
      initialDate,
      finalDate,
      level
    });
    return response.json(result);
  }
}
