import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { VectorImageController } from './vector-image.controller';
import { VectorImageService } from './vector-image.service';

@Module({
  imports: [HttpModule],
  controllers: [VectorImageController],
  providers: [VectorImageService],
})
export class VectorImageModule {}
