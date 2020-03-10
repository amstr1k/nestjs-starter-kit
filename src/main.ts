import { AppStart } from './app-start.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppStart);
  await app.listen(3000);
}
bootstrap();
