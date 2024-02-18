export enum EventTopics {
  forging = 'forging',
  inventing = 'inventing',
}

export class ForgeEvent {
  eventTopic: EventTopics;
  timestamp: number;
  user: string;
  event: any;
  element: string;
  recipe: [string, string, string, string];
}
