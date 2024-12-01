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
import { Work } from '../entities/work.entity';
import { CreateWorkDto } from './work.dto';
import { WorkService } from './work.service';

@ApiTags('works')
@Controller('works')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все работы' })
  async findAll(): Promise<Work[]> {
    return this.workService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Получить все работы пользователя по userId' })
  @ApiParam({ name: 'userId', description: 'ID пользователя', type: Number })
  async findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Work[]> {
    return this.workService.findByUserId(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Создать новую работу' })
  async create(@Body() createWorkDto: CreateWorkDto): Promise<Work> {
    return this.workService.create(createWorkDto);
  }

  @Delete(':workId')
  @ApiOperation({ summary: 'Удалить работу по ID' })
  @ApiParam({ name: 'workId', description: 'ID работы', type: Number })
  async delete(@Param('workId', ParseIntPipe) workId: number): Promise<void> {
    return this.workService.delete(workId);
  }
}
