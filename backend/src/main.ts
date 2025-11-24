import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove chaves que nn estao no dto
      forbidNonWhitelisted: true, // levanta erro ao notar chaves que nn estao no dto
      transform: false, // tenta transformar os tipos de dados de param para dtos
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
