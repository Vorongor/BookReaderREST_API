import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api/:id')
  getId(@Param('id', ParseIntPipe) id: number): string {
    return `Your id is: ${id}`;
  }
}
