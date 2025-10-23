const fetch = require('node-fetch');

async function postToX(content){
  const endpoint = 'https://api.twitter.com/2/tweets';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.X_BEARER_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: content })
  });
  if(!res.ok) throw new Error(`X post failed: ${res.status}`);
  return res.json();
}

module.exports = { postToX };
