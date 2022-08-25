import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ElasticSearchConfiguration } from '@unistory/nestjs-logger';
import { MintRequestEntity } from '../../data/entity/mint-request.entity'

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  // App Core Preferences

  get port(): number {
    return this.configService.get<number>('APP_PORT')
  }

  // Logging preferences

  get elasticSearchConfig(): ElasticSearchConfiguration {
    const elasticSearchEnabled = this.configService.get<string>('ELASTIC_SEARCH_ENABLED')

    if (Number(elasticSearchEnabled) === 0) {
      return null
    }

    return {
      apiKey: this.configService.get<string>('ELASTIC_API_KEY'),
      baseUrl: this.configService.get<string>('ELASTIC_BASE_URL'),
      indexTemplate: this.configService.get<string>('ELASTIC_INDEX_TEMPLATE'),
    }
  }

  // Database preferences

  // // Postgres connection preferences

  get postgresConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [MintRequestEntity],
      keepConnectionAlive: true,
      synchronize: true,
      migrationsRun: true,
      migrations: ['src/data/migrations/*.*'],
    }
  }

  get ipfsToken(): string {
    return this.configService.get<string>('IPFS_TOKEN')
  }
}
