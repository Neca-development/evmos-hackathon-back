import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ApiConfigService } from './infrastructure/config/api-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ApiConfigService = app.get(ApiConfigService);
  const { port } = config;

  if (process.env.NODE_ENV === 'development') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Unistory nestJS starter')
      .setDescription('Unistory nestJS starter API')
      .setVersion('1.0.1')
      .addTag('starter')
      .setBasePath('api')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);
  }

  app.setGlobalPrefix('api', { exclude: [{ path: 'docs', method: RequestMethod.GET }] });
  app.enableCors();

  await app.listen(port || 3000);
}
bootstrap();
