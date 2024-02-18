import { Body, Controller, Headers, Post } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { checkAuthHeader } from './lib/auth';
import { ForgeEvent } from './requests/ForgeEvent';
import { DiscordService } from './discord.service';

@Controller()
export class AppController {
  constructor(
    private readonly eventsGateway: EventsGateway,
    private readonly discordService: DiscordService,
  ) {}

  @Post()
  sendEvent(
    @Headers('Authorization') authHeader: string,
    @Body() request: ForgeEvent,
  ) {
    checkAuthHeader(authHeader);
    return this.eventsGateway.sendEvent(
      request.timestamp,
      request.user,
      request.event,
    );
  }

  @Post('send-event')
  async sendDiscordMessage(
    @Headers('Authorization') authHeader: string,
    @Body() request: ForgeEvent,
  ) {
    checkAuthHeader(authHeader);

    this.eventsGateway.sendForgeEvent(request);
    await this.discordService.sendToChannel(request);
  }
}
