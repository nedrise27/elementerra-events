import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EventsGateway } from './events.gateway';
import { ConfigModule } from '@nestjs/config';
import { DiscordService } from './discord.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [EventsGateway, DiscordService],
})
export class AppModule {}
