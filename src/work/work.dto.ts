import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateWorkDto {
  @ApiProperty({
    example: 'files/work1.svg',
    description: 'Путь к файлу работы',
  })
  @IsString()
  file_path: string;

  @ApiProperty({ example: 'Project Work', description: 'Название работы' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @IsNumber()
  userId: number;
}
