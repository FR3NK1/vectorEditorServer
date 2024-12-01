import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateShapeDto {
  @ApiProperty({ example: 'M10 10 H 90 V 90 H 10 Z', description: 'Путь SVG' })
  @IsString()
  path: string;

  @ApiProperty({ example: '#FF5733', description: 'Цвет заливки' })
  @IsString()
  fill: string;

  @ApiProperty({ example: '#000000', description: 'Цвет обводки' })
  @IsString()
  stroke: string;

  @ApiProperty({ example: 2.0, description: 'Толщина обводки' })
  @IsNumber()
  stroke_width: number;

  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @IsNumber()
  userId: number;
}
