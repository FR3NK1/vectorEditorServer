import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class GetAllVectorImagesDto {
  @IsString()
  name: string;

  @IsInt()
  @Type(() => Number)
  page: number;
}
