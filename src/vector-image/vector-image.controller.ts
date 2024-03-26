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
import { GetAllVectorImagesDto } from './vector-image.dto';
import { VectorImageService } from './vector-image.service';

@Controller('vector-image')
export class VectorImageController {
  constructor(private readonly vectorImageService: VectorImageService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  getAll(@Query() dto: GetAllVectorImagesDto) {
    return this.vectorImageService.getAll(dto);
  }

  @Get('/:id')
  @Header('Content-Type', 'image/svg+xml')
  getResourceById(@Param('id', ParseIntPipe) id: number) {
    return this.vectorImageService.getResourceById(id);
  }
}
