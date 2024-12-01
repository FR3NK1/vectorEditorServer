import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Shape } from '../entities/shape.entity';
import { CreateShapeDto } from './shape.dto';
import { ShapeService } from './shape.service';

@ApiTags('shapes') // Для Swagger
@Controller('shapes')
export class ShapeController {
  constructor(private readonly shapeService: ShapeService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все фигуры' })
  async findAll(): Promise<Shape[]> {
    return this.shapeService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создать новую фигуру' })
  async create(@Body() createShapeDto: CreateShapeDto): Promise<Shape> {
    return this.shapeService.create(createShapeDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Получить все фигуры пользователя по userId' })
  @ApiParam({ name: 'userId', description: 'ID пользователя', type: Number })
  async findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Shape[]> {
    return this.shapeService.findByUserId(userId);
  }

  @Delete(':shapeId')
  @ApiOperation({ summary: 'Удалить фигуру по ID' })
  @ApiParam({ name: 'shapeId', description: 'ID фигуры', type: Number })
  async delete(@Param('shapeId', ParseIntPipe) shapeId: number): Promise<void> {
    return this.shapeService.delete(shapeId);
  }
}
