import { Injectable } from '@nestjs/common';
import { WebhookClient } from 'discord.js';
import { EventTopics, ForgeEvent } from './requests/ForgeEvent';

@Injectable()
export class DiscordService {
  forgingClient: WebhookClient;
  inventingClient: WebhookClient;

  constructor() {
    this.forgingClient = new WebhookClient({
      url: process.env.DISCORD_FORGING_CHANNEL_WEBHOOK_URL,
    });
    this.inventingClient = new WebhookClient({
      url: process.env.DISCORD_INVENTING_CHANNEL_WEBHOOK_URL,
    });
  }

  private printRecipe(recipe: [string, string, string, string]): string {
    return recipe.map((element) => `:${element}:`).join(' + ');
  }

  public async sendToChannel(event: ForgeEvent) {
    if (event.eventTopic === EventTopics.forging) {
      const content = `${event.user} forged ${event.element} with recipe ${this.printRecipe(event.recipe)}`;
      return this.forgingClient.send({ content });
    }

    if (event.eventTopic === EventTopics.inventing) {
      const content = `${event.user} invented ${event.element}! The recipe was ${this.printRecipe(event.recipe)}`;
      return this.inventingClient.send({ content });
    }

    console.log(`Unexpected event topic '${event.eventTopic}'`);
  }
}
