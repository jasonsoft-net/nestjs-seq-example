import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
/**
 * Import the SeqLoggerModule into the root AppModule
 * Added by Jason.Song (成长的小猪) on 2021/09/08
 */
import { SeqLoggerModule } from '@jasonsoft/nestjs-seq';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // /**
    //  * We can import the SeqLoggerModule. Typically, we'll import it into the root AppModule and control its behavior using the .forRoot() static method.
    //  * Added by Jason.Song (成长的小猪) on 2021/09/08
    //  */
    // SeqLoggerModule.forRoot({
    //   /** Customize a log name to facilitate log filtering */
    //   serviceName: 'product-service',
    //   /** The HTTP endpoint address of the Seq server */
    //   serverUrl: 'http://localhost:5341',
    //   /** The API Key to use when connecting to Seq */
    //   apiKey: 'K7iUhZ9OSp6oX5EOCfPt',
    //   /**
    //    * Use module globally
    //    * When you want to use SeqLoggerModule in other modules,
    //    * you'll need to import it (as is standard with any Nest module).
    //    * Alternatively, declare it as a global module by setting the options object's isGlobal property to true, as shown below.
    //    * In that case, you will not need to import SeqLoggerModule in other modules once it's been loaded in the root module
    //    */
    //   isGlobal: true,
    // }),

    /**
     * Async configuration
     * When you need to pass module options asynchronously instead of statically, use the forRootAsync() method.
     * Like other factory providers, our factory function can be async and can inject dependencies through inject.
     * Added by Jason.Song (成长的小猪) on 2021/10/20 11:30:45
     */
    SeqLoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        /** Customize a log name to facilitate log filtering */
        serviceName: configService.get('SEQ_SERVICE_NAME'),
        /** The HTTP endpoint address of the Seq server */
        serverUrl: configService.get('SEQ_SERVER_URL'),
        /** The API Key to use when connecting to Seq */
        apiKey: configService.get('SEQ_API_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
