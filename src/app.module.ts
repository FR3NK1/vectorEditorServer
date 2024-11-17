import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleFontsModule } from './google-fonts/google-fonts.module';
import { VectorImageModule } from './vector-image/vector-image.module';

@Module({
  imports: [
    VectorImageModule,
    GoogleFontsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
