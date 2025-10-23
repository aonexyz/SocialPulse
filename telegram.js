const fetch = require('node-fetch');

async function postToTelegram(content){
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const endpoint = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: content })
  });
  if(!res.ok) throw new Error(`Telegram post failed: ${res.status}`);
  return res.json();
}

module.exports = { postToTelegram };
