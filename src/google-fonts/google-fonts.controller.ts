import { Controller, Get } from '@nestjs/common';
import { GoogleFontsService } from './google-fonts.service';

@Controller('google-fonts')
export class GoogleFontsController {
  constructor(private readonly googleFontsService: GoogleFontsService) {}

  @Get()
  getAll() {
    return this.googleFontsService.getAll();
  }
}
