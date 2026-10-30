# finalsite — AI automation agency website

A marketing website for an AI automation agency: business process automation, sales support, AI chat and voice assistants. Includes animated statistics, a live voice-assistant demo and a lead form that delivers requests to Telegram.

## Features

- Landing page with animated hero, service blocks, case metrics and FAQ
- **Voice chat demo** (`/voice-chat`) — talk to an AI voice agent in the browser via ElevenLabs
- **Stats page** (`/stats-01`)
- **Lead form** — submissions are forwarded to a Telegram chat through an API route (`/api/send-telegram`)
- WebGL / shader effects (three.js), animations (Motion), light and dark themes

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui, Motion, three.js, ElevenLabs React SDK, Docker, nginx, Certbot.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

The lead form needs a Telegram bot token and a chat ID: set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in `src/app/api/send-telegram/route.ts` (moving them to environment variables is recommended).

## Deployment

The site ships with a Dockerfile, docker-compose files for dev and prod, an nginx config and an SSL setup script:

```bash
docker compose -f docker-compose.prod.yml up -d --build
./setup-ssl.sh
```

See [`DOCKER_DEPLOY.md`](DOCKER_DEPLOY.md) and [`SERVER_SETUP.md`](SERVER_SETUP.md).
