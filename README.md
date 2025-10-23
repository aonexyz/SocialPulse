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

---

## Author

- **A 1** – [GitHub: aonexyz](https://github.com/aonexyzl)

---

## Buy me a coffee ☕
Love the bot? Wanna fuel more WAGMI vibes? Drop some crypto love to keep the charts lit! 🙌
- **SUI**: `0x6e20d8f6c15aeb42887608eec65b29385f21fa21cfd23302c54fabd813d8cd38`
- **USDT (TRC20)**: `TMoPwVpeC8A2yTc5qotKj8gVXaGTqQwc3L`
- **BNB (BEP20)**: `0x068ff5934e0c30d8763012a6faa0033e7fdcc455`
- **Binance UID**:`899350787`

Every bit helps me grind harder and keep this bot stacking bags! 😎

---

## 🪪 License
MIT © 2025
