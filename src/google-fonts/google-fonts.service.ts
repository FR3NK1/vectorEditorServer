import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, map } from 'rxjs';

@Injectable()
export class GoogleFontsService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getAll() {
    const apiKey = this.configService.get<string>('GoogleFontsApiKey');
    if (!apiKey) {
      throw new HttpException(
        { message: 'API ключ Google Fonts не найден' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return await firstValueFrom(
      this.httpService
        .get('https://www.googleapis.com/webfonts/v1/webfonts', {
          params: { key: apiKey },
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
        ),
    );
  }
}
