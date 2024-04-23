import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
/**
 * Import the ConsoleSeqLogger to extend the built-in logger for supporting Seq.
 * Added by Jason.Song (成长的小猪) on 2021/09/24
 */
import { ConsoleSeqLogger } from '@jasonsoft/nestjs-seq';

async function bootstrap() {
  /**
   * Set bufferLogs to true to buffer all logs until the ConsoleSeqLogger is attached.
   * This ensures that logs are captured during the application initialization.
   * If initialization fails, Nest will use the default ConsoleLogger to output error messages.
   */
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  /**
   * Use the ConsoleSeqLogger to extend the built-in logger functionality.
   */
  app.useLogger(app.get(ConsoleSeqLogger));

  await app.listen(3000);
}
bootstrap();
