import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';

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

  public sendEvent(timestamp: number, playerAddress: string, event: any) {
    console.log(`Will send event with ${timestamp} ${playerAddress} ${event}`);
    this.server.emit(this.EVENTS_TOPIC, { timestamp, playerAddress, event });
  }
}
