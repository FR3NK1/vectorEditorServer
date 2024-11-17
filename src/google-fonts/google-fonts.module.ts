import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GoogleFontsController } from './google-fonts.controller';
import { GoogleFontsService } from './google-fonts.service';

@Module({
  imports: [HttpModule],
  controllers: [GoogleFontsController],
  providers: [GoogleFontsService],
})
export class GoogleFontsModule {}
