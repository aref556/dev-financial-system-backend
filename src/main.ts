import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.use('/uploads', express.static(BASE_DIR + '/uploads'));
  // app.enableCors();
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3540);
}
bootstrap();
