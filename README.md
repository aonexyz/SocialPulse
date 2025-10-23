# SocialPulse

Automated social media poster using n8n + Google Gemini + Node.js.

## Overview
SocialPulse automatically generates engaging posts with an LLM, schedules them, and posts across X, LinkedIn, and Telegram. n8n orchestrates workflows; a small Node worker provides adapters and optional scheduling logic.

## Quickstart
1. Copy repository to GitHub or your machine.
2. Create an `.env` from `.env.example` and fill credentials.
3. Run `docker-compose up --build` to start n8n and the worker.
4. Import `n8n/workflows/socialpulse-workflow.json` into n8n.
5. Configure credentials in n8n (HTTP Request, OAuth, etc.) per your platform.

## Security & Legal
- Ensure API keys are stored securely (don't commit them).
- Respect each platform's rate limits and terms of service.

## Contact
This is a starter template. Customize prompts, posting rules, and scheduling to fit your needs.
