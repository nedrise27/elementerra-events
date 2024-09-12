export enum EventTopics {
  inventing = 'inventing',
  inventionAttempt = 'inventionAttempt',
  forging = 'forging',
}

export class ForgeEvent {
  eventTopic: EventTopics;
  timestamp: number;
  user: string;
  event?: any;
  element: string;
  isSuccess: boolean;
  preferHidden: boolean;
  recipe: [string, string, string, string];
}
