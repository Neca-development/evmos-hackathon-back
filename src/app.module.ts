import { MintRequestRepository } from 'src/repository/mint-request.repository';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common'
import { AutomapperModule } from '@automapper/nestjs'
import { classes } from '@automapper/classes'
import { APP_PIPE, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { CorrelationIdInterceptor, LoggerModule } from '@unistory/nestjs-logger'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as httpContext from 'express-http-context'

import { MulterModule } from '@nestjs/platform-express';
import { CsvModule } from 'nest-csv-parser';
import { VotingService } from './service/voting.service'
import { DaoRepository } from './repository/dao.repository'
import { UserService } from './service/user.service'
import { DaoController } from './controller/dao.controller'
import { FileService } from './service/file.service'
import { ApiConfigModule } from './infrastructure/config/api-config.module'
import { ApiConfigService } from './infrastructure/config/api-config.service'

import { HttpExceptionFilter } from './infrastructure/middlewares/filters/http-exception.filter'
import { ApiResponseInterceptor } from './infrastructure/middlewares/interceptors/api-response.interceptor'

import { MapperService } from './service/mapper.service'
import { MintRequestController } from './controller/mint-request.controller';
import { MintRequestService } from './service/mint-request.service'
import { IpfsService } from './service/ipfs.service';
import { UserController } from './controller/user.controller';
import { VotingController } from './controller/voting.controller';
import { VotingRepository } from './repository/voting.repository';
import { UserRepository } from './repository/user.repository';
import { DaoService } from './service/dao.service';

@Module({
  imports: [
    ApiConfigModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    CsvModule,
    MulterModule.register({}),

    TypeOrmModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: (config: ApiConfigService) => config.postgresConfig,
      inject: [ApiConfigService],
    }),
    TypeOrmModule.forFeature([MintRequestRepository, DaoRepository, UserRepository, VotingRepository]),

    LoggerModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: (config: ApiConfigService) => config.elasticSearchConfig,
      inject: [ApiConfigService],
    }),
  ],
  controllers: [MintRequestController, DaoController, UserController, VotingController],
  providers: [
    MintRequestRepository,

    DaoRepository,
    UserRepository,

    VotingRepository,

    MapperService,
    VotingService,
    UserService,
    DaoService,
    IpfsService,
    FileService,
    MintRequestService,

    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CorrelationIdInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(httpContext.middleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
