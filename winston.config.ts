// winston.config.ts
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

export const winstonConfig = {
  transports: [
    new winston.transports.File({
      filename: 'logs/app.log', // Путь к файлу логов
      level: 'info', // Уровень логирования
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(), // Форматирование в стиле NestJS
      ),
    }),
  ],
};
