import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { GoogleFontsService } from './google-fonts.service';

@Controller('google-fonts')
export class GoogleFontsController {
  constructor(private readonly googleFontsService: GoogleFontsService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  getAll() {
    return this.googleFontsService.getAll();
  }
}
