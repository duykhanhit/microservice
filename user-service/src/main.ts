import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceModule } from './core/modules/microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/users');
  await app.listen(3000);
  MicroserviceModule.register('user-service', '/api/users');
}
bootstrap();
