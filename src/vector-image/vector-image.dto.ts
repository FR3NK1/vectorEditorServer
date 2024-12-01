import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class GetAllVectorImagesDto {
  @IsString()
  @ApiProperty({ description: 'Название для поиска', example: 'test' })
  name: string;

  @IsInt()
  @Type(() => Number)
  @ApiProperty({ description: 'Номер страницы', example: 1 })
  page: number;
}
