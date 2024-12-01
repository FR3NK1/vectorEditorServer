import {
  Controller,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetAllVectorImagesDto } from './vector-image.dto';
import { VectorImageService } from './vector-image.service';

@ApiTags('vector-image')
@Controller('vector-image')
export class VectorImageController {
  constructor(private readonly vectorImageService: VectorImageService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  @ApiQuery({
    name: 'name',
    type: String,
    required: true,
    description: 'Название для поиска',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: true,
    description: 'Номер страницы',
  })
  getAll(@Query() dto: GetAllVectorImagesDto) {
    return this.vectorImageService.getAll(dto);
  }

  @Get('/:id')
  @Header('Content-Type', 'image/svg+xml')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id картинки',
    example: 4019713,
  })
  getResourceById(@Param('id', ParseIntPipe) id: number) {
    return this.vectorImageService.getResourceById(id);
  }
}
