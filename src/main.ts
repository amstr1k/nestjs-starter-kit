import { AppStart } from './app-start.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppStart);
  await app.listen(3000);
}
bootstrap();
