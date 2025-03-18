import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  // 全局参数验证pipe, transform: true: 将参数转为dto的实例
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 开启静态文件目录
  app.useStaticAssets(join(__dirname, '../uploads'), { prefix: '/uploads' });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
