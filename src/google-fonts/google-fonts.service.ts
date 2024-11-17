import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs';

@Injectable()
export class GoogleFontsService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getAll() {
    return this.httpService
      .get('https://www.googleapis.com/webfonts/v1/webfonts', {
        params: {
          key: this.configService.get<string>('GoogleFontsApiKey'),
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((e) => {
          throw new HttpException(
            {
              message: 'Ошибка получения шрифтов',
              error: e.response.data,
              statusCode: e.response.status,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );
  }
}
