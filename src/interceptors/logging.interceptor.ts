import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { WinstonLogger } from 'nest-winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: WinstonLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, headers } = req;
    const userAgent = headers['user-agent'] || '';
    const now = Date.now();

    this.logger.log(
      `Incoming Request: ${method} ${url} - User-Agent: ${userAgent}`,
    );

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        const { statusCode } = res;
        const contentLength = res.get('content-length');

        this.logger.log(
          `Outgoing Response: ${method} ${url} ${statusCode} - ${contentLength} bytes - ${
            Date.now() - now
          }ms`,
        );
      }),
    );
  }
}
