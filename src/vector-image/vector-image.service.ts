import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import * as AdmZip from 'adm-zip';
import * as fs from 'fs';
import { catchError, firstValueFrom, map } from 'rxjs';
import { GetAllVectorImagesDto } from './vector-image.dto';

@Injectable()
export class VectorImageService {
  constructor(private readonly httpService: HttpService) {}

  async getAll(dto: GetAllVectorImagesDto) {
    return this.httpService
      .get('https://www.freepik.com/api/regular/search', {
        params: {
          'filters[content_type]': 'vector',
          'filters[license]': 'free',
          locale: 'en',
          page: dto.page,
          term: dto.name,
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((e) => {
          throw new HttpException(
            {
              message: 'Ошибка получения изображений',
              error: e.response.data,
              statusCode: e.response.status,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );
  }

  async getResourceById(id: number) {
    const apiUrl = `https://www.freepik.com/api/regular/download?resource=${id}`;
    const response = await firstValueFrom(this.httpService.get(apiUrl));
    console.log(response);
    const zipUrl = response.data.url as string;
    if (zipUrl) {
      const responseZip = await firstValueFrom(
        this.httpService.get(zipUrl, {
          responseType: 'arraybuffer',
        }),
      );
      const zip = new AdmZip(responseZip.data);
      const zipEntries = zip.getEntries();
      const epsEntry = zipEntries.find((entry) => entry.name.endsWith('.eps'));
      if (!fs.existsSync('temp')) {
        fs.mkdirSync('temp');
      }
      fs.writeFileSync(`temp/${epsEntry.entryName}`, zip.readFile(epsEntry));

      return new StreamableFile(fs.createReadStream('temp/2299020.svg'));
    } else {
      throw new HttpException(
        {
          message: 'Ошибка получения изображений',
          error: 'e.response.data',
          statusCode: 'e.response.status',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
