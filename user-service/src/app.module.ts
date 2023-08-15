import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KongGatewayModule } from './core/modules/kong-gateway/kong-gateway.module';

@Module({
  imports: [KongGatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
