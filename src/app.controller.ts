import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
/**
 * Import the SeqLogger for structured logging.
 * This logger allows for easy tracking and querying of log data.
 * Updated by Jason.Song (成长的小猪) on 2024/04/21
 * Added by Jason.Song (成长的小猪) on 2021/09/08.
 */
import { SeqLogger } from '@jasonsoft/nestjs-seq';

@Controller()
export class AppController {
  constructor(
    /**
     * Inject the Seq Logger service for structured logging.
     * This service provides methods to log various levels of information (info, debug, error).
     * Updated by Jason.Song (成长的小猪) on 2024/04/21
     * Added by Jason.Song (成长的小猪) on 2021/09/08.
     */
    private readonly logger: SeqLogger,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.info('getHello - start', AppController.name);

    const result = this.appService.getHello();
    this.logger.debug(
      `Retrieving result from {name}`,
      {
        name: 'AppService',
        result,
        note: 'The message template function is used here',
      },
      AppController.name,
    );

    try {
      throw new Error('Oops! Something whimsically wrong just happened!');
    } catch (error: any) {
      this.logger.error(error, AppController.name);
      this.logger.error(
        'The error has been successfully captured and handled!',
        error,
        AppController.name,
      );

      return result;
    }
  }
}
