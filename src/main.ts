import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(`NestJs starter kit`)
    .setDescription(`This project for education`)
    .setVersion(`0.0.1`)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`api`, app, document);

  await app.listen(8765);
}

bootstrap();
