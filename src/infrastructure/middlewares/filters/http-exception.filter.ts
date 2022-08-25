import { ArgumentsHost, ExceptionFilter, Catch, HttpException } from '@nestjs/common';
import { LoggerService } from '@unistory/nestjs-logger';
import { Response } from 'express';

import { IErrorResponse } from './interfaces/error-response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as IErrorResponse;

    const errorResponse = {
      status,
      data: null,
      error: error.message,
    };

    if (typeof error.message === 'object') {
      this.loggerService.error(error.message.join(', '), exception);
    } else {
      this.loggerService.error(error.message, exception);
    }

    response.status(status).json(errorResponse);
  }
}
