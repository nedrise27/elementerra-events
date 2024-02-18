import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { EventTopics, ForgeEvent } from './requests/ForgeEvent';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  EVENTS_TOPIC = 'events';

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: any) {
    return data;
  }

  @SubscribeMessage('forging')
  handleForgingEvent(@MessageBody() data: any) {
    return data;
  }

  @SubscribeMessage('inventing')
  handleInventngEvent(@MessageBody() data: any) {
    return data;
  }

  public sendForgeEvent(event: ForgeEvent) {
    console.log(`Will send event: ${JSON.stringify(event, null, 0)}`);

    this.server.emit(event.eventTopic, event);
  }

  public sendEvent(timestamp: number, playerAddress: string, event: any) {
    console.log(`Will send event with ${timestamp} ${playerAddress} ${event}`);
    this.server.emit(this.EVENTS_TOPIC, { timestamp, playerAddress, event });
  }
}
