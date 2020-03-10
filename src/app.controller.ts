import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Controller()
export class AppController {
  private appName: string;

  constructor(configService: ConfigService) {
    this.appName = configService.get('APP_NAME');
  }

  @Get()
  index(): string {
    return this.appName;
  }
}
