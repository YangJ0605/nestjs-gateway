import { BaseExceptionsFilter, HttpExceptionFilter } from './common/exceptions';
import { TransformInterceptor } from './common/interceptors';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  ValidationPipe,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { generateDocument } from './utils';

// declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalFilters(new BaseExceptionsFilter(), new HttpExceptionFilter());

  // 开启校验
  app.useGlobalPipes(new ValidationPipe());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
  });

  generateDocument(app);

  // if (module.hot) {
  //   console.log('hmr');
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }

  await app.listen(3000);
}
bootstrap();
