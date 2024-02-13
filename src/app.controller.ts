import { Body, Controller, Headers, Post } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { checkAuthHeader } from './lib/auth';
import { SendEventRequest } from './requests/SendEventRequest';

@Controller()
export class AppController {
  constructor(private readonly eventsGateway: EventsGateway) {}

  @Post()
  sendEvent(
    @Headers('Authorization') authHeader: string,
    @Body() request: SendEventRequest,
  ) {
    checkAuthHeader(authHeader);
    this.eventsGateway.sendEvent(request.timestamp, request.user, request.data);
  }
}
