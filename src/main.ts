import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './modules/app/app.module';
import { API_PREFIX } from './shared/constants/global.constants';
import { SwaggerConfig } from './configs/config.interface';
import { GLOBAL_CONFIG } from './configs/global.config';
import { MyLogger } from './modules/logger/logger.service';
import { InvalidFormExceptionFilter } from './filters/invalid.form.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'error', 'warn'],
  });

  app.setGlobalPrefix(API_PREFIX);

  app.useGlobalFilters(
    // TODO: uncomment when ready
    // new GlobalExceptionFilter(),

    new InvalidFormExceptionFilter()
  );

  if (process.env.NODE_ENV === 'production') {
    app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
    });
  } else {
    app.enableCors({
      origin: true,
      credentials: true,
    });
  }

  const configService = app.get<ConfigService>(ConfigService);
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // Swagger Api
  if (swaggerConfig?.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Documentação')
      .setDescription(swaggerConfig.description || 'Documentação de API')
      .setVersion(swaggerConfig.version || '1.SwaggerModule0')
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  }

  const PORT = process.env.PORT || 3333;

  await app.listen(PORT, async () => {
    const myLogger = await app.resolve(MyLogger);
    myLogger.log(`Server started listening: ${PORT}`);
    console.log(`Server started listening: ${PORT}`);
  });
}
bootstrap();
