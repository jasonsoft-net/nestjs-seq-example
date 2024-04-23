import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Import ConfigModule to manage application configuration through environment variables.
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * Import the SeqLoggerModule into the root AppModule to enable centralized logging.
 * This module is configured to connect to a Seq server for log aggregation and analysis,
 * facilitating effective monitoring and debugging by collecting and storing logs.
 * Updated by Jason.Song (成长的小猪) on 2024/04/21
 * Added by Jason.Song (成长的小猪) on 2021/09/08
 */
import { SeqLoggerModule } from '@jasonsoft/nestjs-seq';

@Module({
  imports: [
    ConfigModule.forRoot(),
    /**
     * Import and configure the SeqLoggerModule using the .forRoot() method.
     * This method initializes the module with server-specific configurations,
     * allowing for centralized management of log data across the application.
     * Updated by Jason.Song (成长的小猪) on 2024/04/21
     * Added by Jason.Song (成长的小猪) on 2021/09/08
     */
    // SeqLoggerModule.forRoot({
    //   /** Specifies the URL of the Seq server to which logs should be sent. */
    //   serverUrl: 'http://localhost:5341',
    //   /** Provides the API Key required for authenticating with the Seq server. */
    //   apiKey: 'K7iUhZ9OSp6oX5EOCfPt',
    //   /** Optional additional metadata properties */
    //   extendMetaProperties: {
    //     /** Defines a custom service name for the logs, aiding in their categorization and filtering.
    //      * This name helps in identifying logs related to this service in a mixed-service environment.
    //      */
    //     serviceName: 'product-service',
    //   },
    //   /** For additional properties and configuration options, refer to the SEQ_LOGGER_OPTIONS.md document and the following link: */
    //   /** [Seq Logger Options Documentation](https://github.com/jasonsoft/nestjs-seq/blob/v2.x.x/SEQ_LOGGER_OPTIONS.md) */
    // }),

    /**
     * Asynchronously configure the SeqLoggerModule using the forRootAsync() method.
     * This method allows module options to be passed asynchronously, leveraging factory providers
     * that can be asynchronous and inject dependencies such as ConfigService.
     * Updated by Jason.Song (成长的小猪) on 2024/04/21
     * Added by Jason.Song (成长的小猪) on 2021/10/20 11:30:45
     */
    SeqLoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        /** Specifies the HTTP endpoint address of the Seq server for log transmission. */
        serverUrl: configService.get('SEQ_SERVER_URL'),
        /** Provides the API Key required for authenticating with the Seq server. */
        apiKey: configService.get('SEQ_API_KEY'),
        /** Optional additional metadata properties to enhance log categorization and filtering. */
        extendMetaProperties: {
          /** Custom service name for the logs to assist in their categorization and filtering within a multi-service environment. */
          serviceName: configService.get('SEQ_SERVICE_NAME'),
        },
        /** For additional properties and configuration options, refer to the SEQ_LOGGER_OPTIONS.md document and the following link: */
        /** [Seq Logger Options Documentation](https://github.com/jasonsoft/nestjs-seq/blob/v2.x.x/SEQ_LOGGER_OPTIONS.md) */
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
