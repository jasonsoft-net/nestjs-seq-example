import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
/**
 * import the SeqLogger
 * Added by Jason.Song (成长的小猪) on 2021/09/08
 */
import { SeqLogger } from '@jasonsoft/nestjs-seq';

@Controller()
export class AppController {
  constructor(
    /**
     * Inject the Seq Logger service
     * We can also inject SeqLogger into controllers.
     * Added by Jason.Song (成长的小猪) on 2021/09/08
     */
    private readonly logger: SeqLogger,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.info('getHello - start');

    const result = this.appService.getHello();
    this.logger.info('getHello - call {service}', {
      service: 'appService',
      result,
      remark: 'Record the returned result',
    });

    try {
      throw new Error('Wow, I reported an error');
    } catch (error) {
      this.logger.error('Record the error', error);
    }
    return result;
  }
}
