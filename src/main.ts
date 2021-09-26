import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
/**
 * Extended built-in recorder to support Seq
 * Import the ConsoleSeqLogger
 * Added by Jason.Song (成长的小猪) on 2021/09/24
 */
import { ConsoleSeqLogger } from '@jasonsoft/nestjs-seq';

async function bootstrap() {
  /**
   * We set the bufferLogs to true to make sure all logs will be buffered until a custom logger
   * is attached (ConsoleSeqLogger in this case) and the application initialization process either completes or fails.
   * If the initialization process fails, Nest will fallback to the original ConsoleLogger to print out any reported error messages.
   */
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  /**
   * Extend built-in logger
   */
  app.useLogger(app.get(ConsoleSeqLogger));

  await app.listen(3000);
}
bootstrap();
