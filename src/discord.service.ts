import { Injectable } from '@nestjs/common';
import { WebhookClient } from 'discord.js';
import { EventTopics, ForgeEvent } from './requests/ForgeEvent';
import * as _ from 'lodash';
import { ELEMENT_ICONS } from './lib/elements';

@Injectable()
export class DiscordService {
  inventingClient: WebhookClient;
  inventionAttemptsClient: WebhookClient;
  forgingClient: WebhookClient;

  constructor() {
    this.inventingClient = new WebhookClient({
      url: process.env.DISCORD_INVENTING_CHANNEL_WEBHOOK_URL,
    });
    this.inventionAttemptsClient = new WebhookClient({
      url: process.env.DISCORD_INVENTION_ATTEMPTS_CHANNEL_WEBHOOK_URL,
    });
    this.forgingClient = new WebhookClient({
      url: process.env.DISCORD_FORGING_CHANNEL_WEBHOOK_URL,
    });
  }

  private printElement(element: string): string {
    const lower = element.toLowerCase();
    const iconOrName = ELEMENT_ICONS[lower];
    if (!_.isNil(iconOrName)) {
      return iconOrName;
    }
    return `<:${lower}:>`;
  }
  private printRecipe(recipe: [string, string, string, string]): string {
    return recipe.map(this.printElement).join(' + ');
  }

  public async sendToChannel(event: ForgeEvent) {
    if (event.eventTopic === EventTopics.inventing) {
      const content = `${event.user} invented ${event.element}! The recipe was ${this.printRecipe(event.recipe)}`;
      return this.inventingClient.send({ content });
    }
    if (event.eventTopic === EventTopics.inventionAttempt) {
      const content = `${event.user} tried a new recipe ${this.printRecipe(event.recipe)}`;
      return this.inventionAttemptsClient.send({ content });
    }
    if (event.eventTopic === EventTopics.forging) {
      const content = `${event.user} forged ${this.printElement(event.element)} with recipe ${this.printRecipe(event.recipe)}`;
      return this.forgingClient.send({ content });
    }

    console.log(`Unexpected event topic '${event.eventTopic}'`);
  }
}
