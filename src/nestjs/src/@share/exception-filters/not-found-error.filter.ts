import { NotFoundError } from '@fc/micro-videos/src/@seedwork/domain';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundError)
export class NotFoundErrorFilter implements ExceptionFilter {
  public catch(exception: NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(404).json({
      statusCode: 404,
      error: 'Not Found',
      message: exception.message,
    });
  }
}
