import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get('PORT');

  app.enableCors({
    origin: true,
    // origin: 'http://localhost:3000',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('사이드 프로젝트 API 문서')
    .setDescription(
      `1. 요청의 성공/실패 여부는 상태코드로만 판단해요.\n2. 성공(200's) 시 data만, 실패(400's or 500) 시 message만 반환해요.\n    - 서버 에러는 500번으로 통일해요.`,
    )
    .setVersion('1.0')
    .addTag('kku')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);
}

bootstrap();
