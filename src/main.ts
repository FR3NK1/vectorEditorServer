// main.ts
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Получаем инстанс логгера Winston
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  // Устанавливаем Winston в качестве глобального логгера для NestJS
  app.useLogger(logger);

  // Применяем глобальный интерсептор логирования
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Запуск приложения
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
