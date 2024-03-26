import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VectorImageModule } from './vector-image/vector-image.module';

@Module({
  imports: [VectorImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
