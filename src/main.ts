import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException, HttpStatus, HttpExceptionOptions, ValidationPipeOptions } from '@nestjs/common';
import { HttpErrorHandler, ExceptionFactory } from '@shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: ExceptionFactory
  }));

  await app.listen(3000);
}
bootstrap();
