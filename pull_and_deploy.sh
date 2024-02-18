#!/usr/bin/env bash

set -e pipefail

cd ~/services/elementerra-events
git pull
npm ci
npm run build
PAIN_TEXT_PASSWORD='__PAIN_TEXT_PASSWORD__' \
  DISCORD_FORGING_CHANNEL_WEBHOOK_URL='__DISCORD_FORGING_CHANNEL_WEBHOOK_URL__' \
  DISCORD_INVENTING_CHANNEL_WEBHOOK_URL='__DISCORD_INVENTING_CHANNEL_WEBHOOK_URL__' \
  /home/admin/.local/bin/pm2 \
  restart ~/services/elementerra-events/pm2.config.js \
  --update-env
