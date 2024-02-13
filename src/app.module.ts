import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EventsGateway } from './events.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [EventsGateway],
})
export class AppModule {}
